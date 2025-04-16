import {
  Category,
  ColorVariant,
  SizeVariant,
  ViewVariant,
} from '@/interface/interface.global';

export interface IProduct {
  id: string;
  name: string;
  shortDescription?: string;
  longDescription?: string;
  category: Category;
  defaultVariant: ProductVariant;
  views: ViewVariant[];
  variants: ProductVariant[];
}
export type ProductVariant = {
  color: ColorVariant;
  size: SizeVariant;
  price: number;
  quantity: number;
  image?: string;
};
