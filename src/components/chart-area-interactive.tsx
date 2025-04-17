'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { useIsMobile } from '@/hooks/use-mobile';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { IChartOrder } from '@/features/order/interface/interface.order';

export const description = 'An interactive area chart';

const chartConfig = {
  orders: {
    label: 'Orders',
  },
  Pending: {
    label: 'Pending',
    color: 'var(--primary)',
  },
  Delivered: {
    label: 'Delivered',
    color: 'var(--primary)',
  },
  Canceled: {
    label: 'Canceled',
    color: 'var(--primary)',
  },
  All: {
    label: 'All',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

export function ChartAreaInteractive({
  chartData,
}: {
  chartData: IChartOrder[];
}) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState('90d');

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('7d');
    }
  }, [isMobile]);

  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>Orders by status</CardTitle>
        <CardDescription>
          <span className='hidden @[540px]/card:block'>
            Total for this year
          </span>
          <span className='@[540px]/card:hidden'>This year</span>
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id='fillDesktop' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='25%' stopColor='#82ca9d' stopOpacity={1.0} />
                <stop offset='75%' stopColor='#82ca9d' stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id='fillMobile' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='25%' stopColor='#82ca9d' stopOpacity={0.8} />
                <stop offset='75%' stopColor='#82ca9d' stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id='fillDesktop' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='25%' stopColor='#82ca9d' stopOpacity={1.0} />
                <stop offset='75%' stopColor='#82ca9d' stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id='fillMobile' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='25%' stopColor='#82ca9d' stopOpacity={0.8} />
                <stop offset='75%' stopColor='#82ca9d' stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={<ChartTooltipContent indicator='dot' />}
            />
            <Area
              dataKey='Pending'
              type='natural'
              fill='url(#fillMobile)'
              stroke='var(--color-mobile)'
              stackId='a'
            />
            <Area
              dataKey='Delivered'
              type='natural'
              fill='url(#fillMobile)'
              stroke='var(--color-mobile)'
              stackId='a'
            />
            <Area
              dataKey='Canceled'
              type='natural'
              fill='url(#fillDesktop)'
              stroke='var(--color-desktop)'
              stackId='a'
            />
            <Area
              dataKey='All'
              type='natural'
              fill='url(#fillDesktop)'
              stroke='var(--color-desktop)'
              stackId='a'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
