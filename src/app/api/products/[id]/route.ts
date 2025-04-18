'use server';

import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import { logError } from '../../logs/route';
import prisma from '@/lib/prisma';

export async function getProductById(
  id: string
): Promise<Prisma.ProductGetPayload<{
  include: { defaultVariant: true; variants: true };
}> | null> {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
      include: {
        defaultVariant: true,
        variants: true,
      },
    });
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    await logError({
      stack: 'Product',
      error: 'Error fetching product : ' + id + ' ' + error,
      timestamp: new Date().toISOString(),
    });
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Client-side fetch route
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const products = await getProductById(params.id);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
