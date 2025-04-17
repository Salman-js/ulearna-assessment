import { ProductVariant } from '@/features/product/interface/interface.product';

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
