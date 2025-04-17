import { ProductVariant } from '@/features/product/interface/interface.product';
import { ColorVariant, SizeVariant } from '@/interface/interface.global';

export interface IOrder {
  id: string;
  products: ProductVariant[];
  status: OrderStatus;
  orderDate: Date;
}

export type OrderStatus = 'Pending' | 'Delivered' | 'Canceled';

export interface ProductVariantOrder {
  id?: string;
  productId?: string;
  product: ProductVariant;
  quantity: number;
}

export interface NewProductVariantOrder {
  id: string;
  productId: string | null | undefined;
  productName: string;
  size: SizeVariant | null | undefined;
  color: ColorVariant | null | undefined;
  price: number;
  quantity: number;
}
