'use client';

import { z } from 'zod';

export const orderSchema = z.object({
  name: z.string().min(2).max(50),
  address: z.string().min(5).max(100),
  cardNumber: z.string().min(16).max(16),
  cvv: z.string().min(3).max(3),
  expirationDate: z.string().min(5).max(5),
});
