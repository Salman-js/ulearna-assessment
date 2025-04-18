import {
  AnalyticsPeriod,
  IMetrics,
} from '@/features/order/interface/interface.order';
import prisma from '@/lib/prisma';
import Sentry from '@/lib/sentry';
import { OrderStatus, Prisma } from '@prisma/client';
import dayjs from 'dayjs';

export async function getOrders({
  period,
  size,
  page,
  status,
}: {
  period: AnalyticsPeriod;
  size: number;
  page: number;
  status?: OrderStatus;
}): Promise<
  Prisma.OrderGetPayload<{
    include: {
      products: {
        include: {
          product: {
            include: {
              product: true;
            };
          };
        };
      };
    };
  }>[]
> {
  try {
    const skip = (page - 1) * size;
    const take = size;
    const dateRange = getDateRange(period);
    const where: Prisma.OrderWhereInput = {
      status: status ?? undefined,
      orderDate: {
        gte: dateRange.startDate,
        lte: dateRange.endDate,
      },
      products: {
        some: {
          product: {
            product: {
              isNot: null,
            },
          },
        },
      },
    };
    const orders = await prisma.order.findMany({
      skip,
      take,
      where,
      include: {
        products: {
          where: {
            product: {
              product: {
                isNot: null,
              },
            },
          },
          include: {
            product: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
    return orders;
  } catch (error) {
    console.error('Error fetching products:', error);
    Sentry.captureException(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

const getDateRange = (
  period: AnalyticsPeriod
): { startDate: Date; endDate: Date } => {
  const endDate = dayjs().endOf('day').toDate();
  let startDate: Date;

  switch (period) {
    case 'one-month':
      startDate = dayjs().subtract(1, 'month').startOf('day').toDate();
      break;
    case 'three-months':
      startDate = dayjs().subtract(3, 'month').startOf('day').toDate();
      break;
    case 'one-week':
      startDate = dayjs().subtract(1, 'week').startOf('day').toDate();
      break;
    default:
      startDate = dayjs().subtract(3, 'month').startOf('day').toDate();
  }

  return { startDate, endDate };
};
export async function getOrdersByDateRange({
  startDate,
  endDate,
  filter,
}: {
  startDate: Date;
  endDate: Date;
  filter?: Prisma.OrderWhereInput;
}) {
  try {
    const dateRange = {
      gte: dayjs(startDate).startOf('day').toDate(),
      lte: dayjs(endDate).endOf('day').toDate(),
    };
    const where: Prisma.OrderWhereInput = {
      ...filter,
      orderDate: dateRange,
    };
    const orders = await prisma.order.findMany({
      where,
      orderBy: {
        orderDate: 'desc',
      },
      include: {
        products: {
          include: {
            product: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
    return orders;
  } catch (error) {
    console.error('Error fetching products:', error);
    Sentry.captureException(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
export async function getChartAnalytics(): Promise<
  {
    month: string;
    Pending: number;
    Delivered: number;
    Canceled: number;
    All: number;
  }[]
> {
  try {
    const currentDate = dayjs();
    const currentYear = currentDate.year();
    const months = Array.from({ length: 12 }, (_, i) =>
      currentDate.month(i).format('MMM')
    );

    const ordersByMonth = await Promise.all(
      months.map(async (month) => {
        const startDate = dayjs(`${month} 1, ${currentYear}`)
          .startOf('month')
          .toDate();
        const endDate = dayjs(`${month} 1, ${currentYear}`)
          .endOf('month')
          .toDate();

        const orders = await getOrdersByDateRange({ startDate, endDate });
        const processedOrders = orders.map((order) => {
          const amount = order.products.reduce(
            (sum, { quantity, product }) =>
              sum + Number(product?.price || 0) * Number(quantity),
            0
          );
          return {
            ...order,
            amount,
          };
        });

        const pendingOrders = processedOrders
          .filter((order) => order.status === OrderStatus.Pending)
          .reduce((sum, { amount }) => sum + amount, 0);
        const deliveredOrders = processedOrders
          .filter((order) => order.status === OrderStatus.Delivered)
          .reduce((sum, { amount }) => sum + amount, 0);
        const canceledOrders = processedOrders
          .filter((order) => order.status === OrderStatus.Canceled)
          .reduce((sum, { amount }) => sum + amount, 0);

        return {
          month,
          Pending: pendingOrders,
          Delivered: deliveredOrders,
          Canceled: canceledOrders,
          All: pendingOrders + deliveredOrders + canceledOrders,
        };
      })
    );

    return ordersByMonth;
  } catch (error) {
    console.error('Error fetching products:', error);
    Sentry.captureException(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
export async function getMetrics(): Promise<IMetrics> {
  try {
    const currentDate = dayjs();
    const thisMonthRange = {
      startDate: dayjs(currentDate).startOf('month').toDate(),
      endDate: dayjs(currentDate).endOf('month').toDate(),
    };
    const lastMonthRange = {
      startDate: dayjs(currentDate)
        .subtract(1, 'month')
        .startOf('month')
        .toDate(),
      endDate: dayjs(currentDate).subtract(1, 'month').endOf('month').toDate(),
    };
    const thisMonthOrders = await getOrdersByDateRange({
      ...thisMonthRange,
      filter: { status: OrderStatus.Delivered },
    });

    const lastMonthOrders = await getOrdersByDateRange({
      ...lastMonthRange,
      filter: { status: OrderStatus.Delivered },
    });
    const thisMonthRevenue = thisMonthOrders.reduce((total, { products }) => {
      return (
        total +
        products.reduce(
          (sum, { product, quantity }) =>
            sum + Number(product?.price || 0) * quantity,
          0
        )
      );
    }, 0);
    const lastMonthRevenue = lastMonthOrders.reduce((total, { products }) => {
      return (
        total +
        products.reduce(
          (sum, { product, quantity }) =>
            sum + Number(product?.price || 0) * quantity,
          0
        )
      );
    }, 0);

    const thisMonthTopSellingItem = await prisma.productVariant.findMany({
      where: {
        product: {
          isNot: null,
        },
        orders: {
          some: {
            order: {
              status: OrderStatus.Delivered,
            },
          },
        },
      },
      include: {
        product: true,
        _count: {
          select: {
            orders: {
              where: {
                order: {
                  orderDate: {
                    gte: thisMonthRange.startDate,
                    lte: thisMonthRange.endDate,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        orders: {
          _count: 'desc',
        },
      },
    });

    const lastMonthTopSellingItem = await prisma.productVariant.findMany({
      where: {
        product: {
          isNot: null,
        },
        orders: {
          some: {
            order: {
              status: OrderStatus.Delivered,
            },
          },
        },
      },
      include: {
        product: true,
        _count: {
          select: {
            orders: {
              where: {
                order: {
                  orderDate: {
                    gte: lastMonthRange.startDate,
                    lte: lastMonthRange.endDate,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        orders: {
          _count: 'desc',
        },
      },
    });
    const thisMonthOrdersCount = thisMonthOrders.length;
    const lastMonthOrdersCount = lastMonthOrders.length;
    const revenueGrowthRate =
      ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;
    const countGrowthRate =
      ((thisMonthOrdersCount - lastMonthOrdersCount) / lastMonthOrdersCount) *
      100;
    const data = {
      revenue: {
        thisMonth: thisMonthRevenue,
        lastMonth: lastMonthRevenue,
        growthRate: revenueGrowthRate,
      },
      numOfOrders: {
        thisMonth: thisMonthOrdersCount,
        lastMonth: lastMonthOrdersCount,
        growthRate: countGrowthRate,
      },
      topSeller: {
        thisMonth: thisMonthTopSellingItem[0]?.product?.name,
        lastMonth: lastMonthTopSellingItem[0]?.product?.name,
      },
      topSellerSaleCount: {
        thisMonth: thisMonthTopSellingItem[0]?._count.orders,
        lastMonth: lastMonthTopSellingItem[0]?._count.orders,
        growthRate:
          ((thisMonthTopSellingItem[0]?._count.orders -
            lastMonthTopSellingItem[0]?._count.orders) /
            lastMonthTopSellingItem[0]?._count.orders) *
          100,
      },
    };

    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    Sentry.captureException(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
