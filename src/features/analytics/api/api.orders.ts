import { ITableOrder } from '@/features/order/interface/interface.order';
import { useFetchQuery } from '@/hooks/query.hooks';
import { OrderTableQuery } from '@/interface/interface.global';

export function useFetchOrders(
  initialData: ITableOrder[],
  params: OrderTableQuery
) {
  return useFetchQuery<ITableOrder[]>(
    '/api/orders',
    ['orders', params],
    params,
    initialData
  );
}
