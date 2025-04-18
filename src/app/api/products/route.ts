'use server';

import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function getProducts(): Promise<
  Prisma.ProductGetPayload<{
    include: { defaultVariant: true; variants: true };
  }>[]
> {
  try {
    const products = await prisma.product.findMany({
      include: {
        defaultVariant: true,
        variants: true,
      },
    });
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
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
