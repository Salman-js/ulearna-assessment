import {
  Category,
  ColorVariant,
  SizeVariant,
} from '@/interface/interface.global';

export interface IProduct {
  id: string;
  name: string;
  shortDescription?: string;
  longDescription?: string;
  category: Category;
  defaultVariant: ProductVariant;
  variants: ProductVariant[];
}
export type ProductVariant = {
  color: ColorVariant;
  size: SizeVariant;
  price: number;
  quantity: number;
  image?: string;
};
