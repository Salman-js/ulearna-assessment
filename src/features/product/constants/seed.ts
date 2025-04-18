'use server';

import { Prisma, OrderStatus } from '@prisma/client';
import { productsSeedData } from './data';
import dayjs from 'dayjs';
import { getRandomNumber } from '@/lib/utils';
import prisma from '@/lib/prisma';

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
      await prisma.product.create({ data: prod });
    }
    console.log('Products Created');
    const variants = await prisma.productVariant.findMany();

    const startDate = dayjs().subtract(3, 'month').startOf('week');
    const weeks = 96;

    // Generate orders for each variant
    const ordersData: Prisma.OrderCreateArgs['data'][] = [];

    console.log('Creating orders...');
    for (const variant of variants) {
      for (let week = 0; week < weeks; week++) {
        // Calculate base date for the week
        const weekStart = startDate.add(week, 'week');

        // Create 3 orders a week: One Pending, One Delivered, one Canceled
        const orderStatuses: { status: OrderStatus; dayOffset: number }[] = [
          { status: OrderStatus.Pending, dayOffset: 1 }, // Monday
          { status: OrderStatus.Delivered, dayOffset: 3 }, // Wednesday
          { status: OrderStatus.Canceled, dayOffset: 5 }, // Friday
        ];

        for (const { status, dayOffset } of orderStatuses) {
          const orderDate = weekStart.add(dayOffset, 'day').toDate();

          ordersData.push({
            status,
            orderDate,
            products: {
              create: [
                {
                  productId: variant.id,
                  quantity:
                    status === 'Pending'
                      ? getRandomNumber(1, 4)
                      : status === 'Canceled'
                      ? getRandomNumber(1, 2)
                      : getRandomNumber(4, 12),
                },
              ],
            },
          });
        }
      }
    }

    // Create all orders
    for (const orderData of ordersData) {
      await prisma.order.create({
        data: orderData,
      });
    }
    console.log('Orders created');
    console.log('Seeding completed');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
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
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
