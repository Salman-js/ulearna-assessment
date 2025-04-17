import {
  Category,
  ColorVariant,
  SizeVariant,
  ViewVariant,
} from '@/interface/interface.global';
import { Prisma } from '@prisma/client';

export interface IProduct
  extends Prisma.ProductGetPayload<{
    include: { defaultVariant: true; variants: true };
  }> {}

export type ProductVariant = {
  id?: string;
  productId?: string | null;
  color: ColorVariant;
  size: SizeVariant;
  price: number;
  quantity: number;
};
