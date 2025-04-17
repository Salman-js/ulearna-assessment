'use server';

import {
  AnalyticsPeriod,
  INewOrder,
  NewProductVariantOrder,
} from '@/features/order/interface/interface.order';
import { OrderStatus, Prisma, PrismaClient, Product } from '@prisma/client';
import dayjs from 'dayjs';
import { NextResponse } from 'next/server';
import { logError } from '../logs/route';

const prisma = new PrismaClient();
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
    };
    const orders = await prisma.order.findMany({
      skip,
      take,
      where,
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
    await logError({
      stack: 'Products',
      error: 'Error fetching orders: ' + error,
      timestamp: new Date().toISOString(),
    });
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
export async function createOrder(items: NewProductVariantOrder[]) {
  try {
    const order = await prisma.order.create({
      data: {
        orderDate: new Date(),
        status: 'Pending',
        products: {
          create: items.map(({ productId, quantity }) => ({
            productId,
            quantity,
          })),
        },
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    await logError({
      stack: 'Order',
      error: 'Error creating order: ' + error,
      timestamp: new Date().toISOString(),
    });
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period =
      (searchParams.get('period') as AnalyticsPeriod | undefined) ??
      'three-months';
    const size = Number(searchParams.get('size') || 20);
    const page = Number(searchParams.get('page') || 1);
    const status = searchParams.get('status') as OrderStatus | undefined;

    const orders = await getOrders({
      period,
      size,
      page,
      status,
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body as INewOrder;

    const order = await createOrder(items);

    return NextResponse.json({ message: 'Order created successfully!' });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
