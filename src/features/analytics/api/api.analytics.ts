import {
  IChartOrder,
  IMetrics,
} from '@/features/order/interface/interface.order';
import { useFetchQuery } from '@/hooks/query.hooks';

export function useFetchChartAnalytics() {
  return useFetchQuery<IChartOrder[]>('/api/orders/analytics', ['analytics']);
}

export function useFetchMetrics() {
  return useFetchQuery<IMetrics>('/api/orders/analytics/metrics', ['metrics']);
}
