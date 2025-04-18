import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function getProductById(id: string): Promise<Prisma.ProductGetPayload<{
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
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    if (!id) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 404 });
    }
    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
