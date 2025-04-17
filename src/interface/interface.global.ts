import { Color, Size, Category as PrismaCategory, View } from '@prisma/client';

export type ColorVariant = Color;
export type SizeVariant = Size;
export type Category = PrismaCategory;
export type ViewVariant = View;
export type AnalyticsPeriod = 'three-months' | 'one-month' | 'one-week';
export type OrderStatus = 'Pending' | 'Delivered' | 'Canceled';
export type OrderTableQuery = {
  period: AnalyticsPeriod;
  size: number;
  page: number;
  status?: OrderStatus;
};
