import { PrismaClient, Prisma } from '@prisma/client';
import { productsSeedData } from '@/features/product/constants/data';

const prisma = new PrismaClient();

const productsData: Prisma.ProductCreateInput[] = productsSeedData.map(
  ({ defaultVariant, variants, views, id, ...prod }) => ({
    ...prod,
    defaultVariant: {
      create: {
        color: defaultVariant.color,
        price: defaultVariant.price,
        quantity: defaultVariant.quantity,
        size: defaultVariant.size,
      },
    },
    variants: {
      createMany: {
        data: variants,
      },
    },
    views,
  })
);

export async function main() {
  for (const prod of productsData) {
    await prisma.product.create({ data: prod });
  }
}

main();
