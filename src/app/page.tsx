import { SectionCards } from '@/components/section-cards';
import TableContainer from '@/features/order/components/table-container';
import AnalyticsChart from '@/features/analytics/components/analytics-chart';

export default async function Page() {
  return (
    <main className='flex flex-1 flex-col' aria-label='main-container'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <SectionCards />
          <div className='px-2 lg:px-6'>
            <AnalyticsChart />
          </div>
          <TableContainer />
        </div>
      </div>
    </main>
  );
}
