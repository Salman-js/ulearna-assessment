import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { SectionCards } from '@/components/section-cards';
import { getOrders } from './api/orders/route';
import TableContainer from '@/features/analytics/components/table-container';

export default async function Page() {
  const initialData = await getOrders({
    page: 1,
    size: 20,
    period: 'one-month',
  });
  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <SectionCards />
          <div className='px-4 lg:px-6'>
            <ChartAreaInteractive />
          </div>
          <TableContainer orders={initialData} />
        </div>
      </div>
    </div>
  );
}
