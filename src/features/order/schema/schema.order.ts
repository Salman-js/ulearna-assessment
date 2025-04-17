'use client';

import { z } from 'zod';

export const orderSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name must be 50 characters or less' }),
  address: z
    .string()
    .min(5, { message: 'Address must be at least 5 characters long' })
    .max(100, { message: 'Address must be 100 characters or less' }),
  cardNumber: z
    .string()
    .length(16, { message: 'Card number must be exactly 16 digits' }),
  cvv: z.string().length(3, { message: 'CVV must be exactly 3 digits' }),
  expirationDate: z.string().refine(
    (value) => {
      const [month, year] = value.split('/').map(Number);
      const currentYear = new Date().getFullYear() % 100;
      return (
        month >= 1 &&
        month <= 12 &&
        year >= currentYear &&
        year <= currentYear + 10
      );
    },
    {
      message:
        'Expiration date must be a valid future date within the next 10 years',
    }
  ),
});
