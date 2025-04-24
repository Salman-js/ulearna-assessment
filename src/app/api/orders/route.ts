'use server';

import {
  AnalyticsPeriod,
  INewOrder,
  NewProductVariantOrder,
} from '@/features/order/interface/interface.order';
import { OrderStatus, Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import Sentry from '@/lib/sentry';

async function getOrders({
  size,
  page,
  status,
}: {
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
    const where: Prisma.OrderWhereInput = {
      status: status ?? undefined,
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
async function createOrder(items: NewProductVariantOrder[]) {
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
    Sentry.captureException(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const size = Number(searchParams.get('size') || 20);
    const page = Number(searchParams.get('page') || 1);
    const status = searchParams.get('status') as OrderStatus | undefined;

    const orders = await getOrders({
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
