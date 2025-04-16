import { ProductVariant } from '@/features/product/interface/interface.product';

export interface IOrder {
  id: string;
  productId: string;
  productVariant: ProductVariant;
  status: OrderStatus;
  orderDate: Date;
}

export type OrderStatus = 'Pending' | 'Delivered' | 'Canceled';
