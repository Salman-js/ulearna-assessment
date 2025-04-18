import { SectionCards } from '@/components/section-cards';
import { getOrders } from './api/orders/route';
import TableContainer from '@/features/order/components/table-container';
import { getChartAnalytics } from './api/orders/analytics/route';
import AnalyticsChart from '@/features/analytics/components/analytics-chart';
import { getMetrics } from './api/orders/analytics/metrics/route';

export default async function Page() {
  const initialData = await getOrders({
    page: 1,
    size: 20,
    period: 'one-month',
  });
  const initialChartData = await getChartAnalytics();
  const initialMetricsData = await getMetrics();
  return (
    <main className='flex flex-1 flex-col' aria-label='main-container'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <SectionCards metricsData={initialMetricsData} />
          <div className='px-4 lg:px-6'>
            <AnalyticsChart initialData={initialChartData} />
          </div>
          <TableContainer orders={initialData} />
        </div>
      </div>
    </main>
  );
}
