'use client';

import { useCart } from '@/features/cart/hooks/use-cart';
import {
  onErrorNotification,
  onSuccessNotification,
} from '@/features/cart/hooks/use-notifications';
import {
  IOrder,
  ITableOrder,
  OrderTableQuery,
} from '@/features/order/interface/interface.order';
import { useFetchQuery, useMutate } from '@/hooks/query.hooks';
import { useQueryClient } from '@tanstack/react-query';

export function useFetchOrders(params: OrderTableQuery) {
  return useFetchQuery<ITableOrder[]>(
    '/api/orders',
    ['orders', params],
    params
  );
}
export const useCreateOrder = () => {
  const { clearCart, openCart } = useCart();
  const queryClient = useQueryClient();

  const onError = (error: unknown) => {
    onErrorNotification(error);
  };

  const onSuccess = (data: any) => {
    clearCart();
    openCart();
    queryClient.invalidateQueries({
      queryKey: ['orders'],
    });
    onSuccessNotification(data);
  };

  return useMutate<IOrder>('/api/orders', 'post', {
    onError,
    onSuccess,
  });
};
