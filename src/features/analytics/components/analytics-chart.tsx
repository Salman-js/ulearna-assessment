'use client';

import React from 'react';
import { IChartOrder } from '../../order/interface/interface.order';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { useFetchChartAnalytics } from '../api/api.analytics';

const AnalyticsChart: React.FC = () => {
  const { data } = useFetchChartAnalytics();
  return (
    <div className='px-4 lg:px-6'>
      <ChartAreaInteractive chartData={data ?? []} />
    </div>
  );
};
export default AnalyticsChart;
