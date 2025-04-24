import { OrderStatus, Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import Sentry from '@/lib/sentry';
import { getRedis } from '@/lib/redis';

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
async function getChartAnalytics(): Promise<
  {
    month: string;
    Pending: number;
    Delivered: number;
    Canceled: number;
    All: number;
  }[]
> {
  try {
    const redis = await getRedis();
    const cachedData = await redis.get('analytics');
    if (cachedData) {
      return JSON.parse(cachedData);
    }
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
    await redis.set('analytics', JSON.stringify(ordersByMonth), {
      EX: 300,
    });
    return ordersByMonth;
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
    const orders = await getChartAnalytics();
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
