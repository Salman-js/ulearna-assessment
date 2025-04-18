'use server';

import { Prisma, OrderStatus } from '@prisma/client';
import { productsSeedData } from './data';
import dayjs from 'dayjs';
import { getRandomNumber } from '@/lib/utils';
import prisma from '@/lib/prisma';
import Sentry from '@/lib/sentry';

const productsData: Prisma.ProductCreateInput[] = productsSeedData.map(
  ({ defaultVariant, variants, views, id, ...prod }) => ({
    ...prod,
    defaultVariant: defaultVariant
      ? {
          create: {
            color: defaultVariant.color,
            price: defaultVariant.price,
            quantity: defaultVariant.quantity,
            size: defaultVariant.size,
          },
        }
      : undefined,
    variants: {
      createMany: {
        data: variants,
      },
    },
    views: {
      set: views,
    },
  })
);

export async function seed() {
  try {
    console.log('Starting database seeding...');
    console.log('Purging existing data...');
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();
    await prisma.order.deleteMany();

    console.log('Creating products...');
    for (const prod of productsData) {
      await prisma.product.create({
        data: {
          ...prod,
          variants: {
            create: prod.variants?.create || [],
          },
          defaultVariant: prod.defaultVariant || undefined,
        },
      });
    }
    console.log('Products Created');

    const variants = await prisma.productVariant.findMany({
      where: {
        productId: {
          not: null,
        },
      },
    });
    console.log('Variants found:', variants);

    if (!variants.length) {
      throw new Error(
        'No variants found. Ensure productsData creates ProductVariant records.'
      );
    }

    const startDate = dayjs().subtract(3, 'month').startOf('week');
    const weeks = 14;

    const ordersData: Prisma.OrderCreateArgs['data'][] = [];

    console.log('Creating orders...');
    // Define possible order statuses
    const possibleStatuses = [
      OrderStatus.Pending,
      OrderStatus.Delivered,
      OrderStatus.Canceled,
    ];

    for (const variant of variants) {
      for (let week = 0; week < weeks; week++) {
        const weekStart = startDate.add(week, 'week');

        // Pick a random status
        const randomStatus =
          possibleStatuses[Math.floor(Math.random() * possibleStatuses.length)];
        // Pick a random day offset (1 to 5)
        const dayOffset = getRandomNumber(1, 5);
        const orderDate = weekStart.add(dayOffset, 'day').toDate();

        ordersData.push({
          status: randomStatus,
          orderDate,
          products: {
            create: [
              {
                productId: variant.id, // Ensure this is ProductVariant id
                quantity: getRandomNumber(1, 5),
              },
            ],
          },
        });
      }
    }

    console.log('Orders to create:', ordersData.length);
    for (const orderData of ordersData) {
      await prisma.order.create({
        data: orderData,
      });
    }
    console.log('Orders created');
    console.log('Seeding completed');
  } catch (error) {
    console.error('Error during seeding:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function purge() {
  try {
    console.log('Purging existing data...');
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();
    await prisma.order.deleteMany();

    console.log('Purging completed');
  } catch (error) {
    console.error('Error during purging:', error);
    Sentry.captureException(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function notEmpty(): Promise<boolean> {
  try {
    const productsCount = await prisma.product.count();

    return productsCount ? true : false;
  } catch (error) {
    console.error('Error during purging:', error);
    Sentry.captureException(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
