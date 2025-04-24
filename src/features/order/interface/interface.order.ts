import { ProductVariant } from '@/features/product/interface/interface.product';
import { ColorVariant, SizeVariant } from '@/interface/interface.global';
import { Prisma } from '@prisma/client';

export type AnalyticsPeriod = 'three-months' | 'one-month' | 'one-week';
export type OrderTableQuery = {
  size: number;
  page: number;
  status?: OrderStatus;
};
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

export interface ITableOrder
  extends Prisma.OrderGetPayload<{
    include: {
      products: {
        include: {
          product: {
            include: {
              product: true;
            };
          };
        };
      };
    };
  }> {}

export interface IChartOrder {
  month: string;
  Pending: number;
  Delivered: number;
  Canceled: number;
  All: number;
}

export interface IMetrics {
  revenue: {
    thisMonth: number;
    lastMonth: number;
    growthRate: number;
  };
  numOfOrders: {
    thisMonth: number;
    lastMonth: number;
    growthRate: number;
  };
  topSeller: {
    thisMonth: string | undefined;
    lastMonth: string | undefined;
  };
  topSellerSaleCount: {
    thisMonth: number | undefined;
    lastMonth: number | undefined;
    growthRate: number;
  };
}

export interface INewOrder {
  items: NewProductVariantOrder[];
}
