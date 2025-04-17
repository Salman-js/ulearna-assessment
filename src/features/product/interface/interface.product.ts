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

export interface ISeedProduct
  extends Prisma.ProductGetPayload<{
    select: {
      category: true;
      name: true;
      shortDescription: true;
      longDescription: true;
      views: true;
      id: true;
      defaultVariant: {
        select: {
          color: true;
          price: true;
          quantity: true;
          size: true;
        };
      };
      variants: {
        select: {
          color: true;
          price: true;
          quantity: true;
          size: true;
        };
      };
    };
  }> {}

export type ProductVariant = {
  id?: string;
  productId?: string | null;
  color: ColorVariant;
  size: SizeVariant;
  price: number;
  quantity: number;
};
