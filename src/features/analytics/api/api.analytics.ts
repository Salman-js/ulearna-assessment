import {
  IChartOrder,
  IMetrics,
} from '@/features/order/interface/interface.order';
import { useFetchQuery } from '@/hooks/query.hooks';

export function useFetchChartAnalytics(initialData: IChartOrder[]) {
  return useFetchQuery<IChartOrder[]>(
    '/api/orders/analytics',
    ['analytics'],
    initialData
  );
}

export function useFetchMetrics(initialData: IMetrics) {
  return useFetchQuery<IMetrics>(
    '/api/orders/analytics/metrics',
    ['metrics'],
    initialData
  );
}
