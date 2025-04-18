import prisma from '@/lib/prisma';
import Sentry from '@/lib/sentry';
import { Prisma } from '@prisma/client';

export async function getProducts(): Promise<
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
    Sentry.captureException(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

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
    Sentry.captureException(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
