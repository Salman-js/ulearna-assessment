'use client';

import React from 'react';
import { IChartOrder } from '../../order/interface/interface.order';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { useFetchChartAnalytics } from '../api/api.analytics';

type analyticsChartProps = {
  initialData: IChartOrder[];
};

const AnalyticsChart: React.FC<analyticsChartProps> = ({ initialData }) => {
  const { data } = useFetchChartAnalytics(initialData);
  return (
    <div className='px-4 lg:px-6'>
      <ChartAreaInteractive chartData={data ?? []} />
    </div>
  );
};
export default AnalyticsChart;
