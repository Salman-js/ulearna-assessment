'use server';

import { OrderStatus, Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import Sentry from '@/lib/sentry';

async function getOrdersCount({
  status,
}: {
  status?: OrderStatus;
}): Promise<number> {
  try {
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
    const ordersCount = await prisma.order.count({
      where,
    });
    return ordersCount;
  } catch (error) {
    console.error('Error fetching products:', error);
    Sentry.captureException(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as OrderStatus | undefined;

    const orders = await getOrdersCount({
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
