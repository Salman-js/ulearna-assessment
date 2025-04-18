'use server';

import { IMetrics } from '@/features/order/interface/interface.order';
import prisma from '@/lib/prisma';
import Sentry from '@/lib/sentry';
import { OrderStatus, Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

async function getOrdersByDateRange({
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
async function getMetrics(): Promise<IMetrics> {
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

// Client-side fetch route
export async function GET() {
  try {
    const orders = await getMetrics();
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
