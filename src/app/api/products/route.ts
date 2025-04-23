'use server';

import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import Sentry from '@/lib/sentry';
import { getRedis } from '@/lib/redis';

async function getProducts(): Promise<
  Prisma.ProductGetPayload<{
    include: { defaultVariant: true; variants: true };
  }>[]
> {
  try {
    const redis = await getRedis();
    const cachedData = await redis.get(`products`);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const products = await prisma.product.findMany({
      include: {
        defaultVariant: true,
        variants: true,
      },
    });
    await redis.set(`products`, JSON.stringify(products), {
      EX: 3600 * 24,
    });
    return products;
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
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
