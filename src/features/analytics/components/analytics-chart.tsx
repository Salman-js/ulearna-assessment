'use client';

import React from 'react';
import { IChartOrder } from '../../order/interface/interface.order';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { useFetchChartAnalytics } from '../api/api.analytics';
import { Skeleton } from '@/components/ui/skeleton';

const AnalyticsChart: React.FC = () => {
  const { data, isLoading } = useFetchChartAnalytics();
  return (
    <div className='px-4 lg:px-6'>
      {isLoading ? (
        <Skeleton className='w-full h-72' />
      ) : (
        <ChartAreaInteractive chartData={data ?? []} />
      )}
    </div>
  );
};
export default AnalyticsChart;
