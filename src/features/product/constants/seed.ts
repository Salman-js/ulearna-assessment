'use server';

import { Prisma, OrderStatus } from '@prisma/client';
import { productsSeedData } from './data';
import dayjs from 'dayjs';
import { getRandomNumber } from '@/lib/utils';
import prisma from '@/lib/prisma';
import Sentry from '@/lib/sentry';

export async function seed() {
  try {
    console.log('Starting database seeding...');
    console.log('Purging existing data...');
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();
    await prisma.order.deleteMany();

    console.log('Creating products...');
    const productsData: Prisma.ProductCreateInput[] = productsSeedData.map(
      ({ defaultVariant, variants, views, id, ...prod }) => ({
        ...prod,
        views: {
          set: views,
        },
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
      })
    );

    for (const prod of productsData) {
      console.log(`Creating product: ${prod.name}`);
      const createdProduct = await prisma.product.create({
        data: prod,
      });
      console.log(`Created product with ID: ${createdProduct.id}`);

      // Find the corresponding seed data to get variants
      const seedProduct = productsSeedData.find((p) => p.name === prod.name);
      if (seedProduct?.variants) {
        console.log(
          `Creating ${seedProduct.variants.length} variants for product: ${prod.name}`
        );
        await prisma.productVariant.createMany({
          data: seedProduct.variants.map((variant) => ({
            color: variant.color as 'white' | 'gray' | 'black',
            size: variant.size as 'sm' | 'm' | 'lg',
            price: variant.price,
            quantity: variant.quantity,
            productId: createdProduct.id,
          })),
        });
        console.log(`Created variants for product: ${prod.name}`);
      }
    }
    console.log('Products and variants created');

    // Verify created products and variants
    const createdProducts = await prisma.product.findMany({
      include: { variants: true, defaultVariant: true },
    });
    console.log(
      'Created products with variants:',
      JSON.stringify(createdProducts, null, 2)
    );

    const variants = await prisma.productVariant.findMany();

    console.log('Creating orders...');
    const possibleStatuses = [
      OrderStatus.Pending,
      OrderStatus.Delivered,
      OrderStatus.Canceled,
    ];

    // Define the time range: April 18, 2024 to April 18, 2025
    const startDate = dayjs().startOf('year');
    const endDate = dayjs();
    const daysInYear = endDate.diff(startDate, 'day'); // 365 days

    // Generate exactly 50 orders
    const ordersData: Prisma.OrderCreateArgs['data'][] = Array.from(
      { length: 30 },
      () => {
        // Pick a random variant
        const randomVariant =
          variants[Math.floor(Math.random() * variants.length)];
        // Pick a random status
        const randomStatus =
          possibleStatuses[Math.floor(Math.random() * possibleStatuses.length)];
        // Pick a random number of days (0 to 365)
        const randomDays = Math.floor(Math.random() * daysInYear);
        // Calculate the order date
        const orderDate = startDate.add(randomDays, 'day').toDate();
        // Pick a random quantity
        const quantity = getRandomNumber(1, 5);

        return {
          status: randomStatus,
          orderDate,
          products: {
            create: [
              {
                productId: randomVariant.id,
                quantity,
              },
            ],
          },
        };
      }
    );

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
