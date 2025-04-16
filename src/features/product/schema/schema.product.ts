import { z } from 'zod';
export const productVariantSchema = z.object({
  price: z.number(),
  quantity: z.number(),
  size: z.enum(['sm', 'lg', 'xl']),
  color: z.enum(['white', 'black', 'gray']),
});
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortDescription: z.string().optional(),
  longDescription: z.string().optional(),
  category: z.string().optional(),
  defaultVariant: productVariantSchema,
  variants: z.array(productVariantSchema),
});
