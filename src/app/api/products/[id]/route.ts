'use server';

import { PrismaClient, Product } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function getProductById(id: string): Promise<Product | null> {
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
