import { SectionCards } from '@/components/section-cards';
import TableContainer from '@/features/order/components/table-container';
import AnalyticsChart from '@/features/analytics/components/analytics-chart';
import { getChartAnalytics, getMetrics, getOrders } from '@/api/orders.api';

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
