import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IMetrics } from '@/features/order/interface/interface.order';
import { formatCurrency } from '@/lib/utils';

export function SectionCards({ metricsData }: { metricsData: IMetrics }) {
  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            ${formatCurrency(metricsData.revenue.thisMonth)}
          </CardTitle>
          <CardAction>
            {metricsData.revenue.growthRate > 0 ? (
              <Badge variant='outline'>
                <IconTrendingUp />+
                {formatCurrency(metricsData.revenue.growthRate)}%
              </Badge>
            ) : (
              <Badge variant='outline'>
                <IconTrendingDown />
                {formatCurrency(metricsData.revenue.growthRate)}%
              </Badge>
            )}
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          {metricsData.revenue.growthRate > 0 ? (
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Trending up this month <IconTrendingUp className='size-4' />
            </div>
          ) : (
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Trending down this month <IconTrendingDown className='size-4' />
            </div>
          )}
          <div className='text-muted-foreground'>
            last month was ${formatCurrency(metricsData.revenue.lastMonth)}
          </div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Orders Delivered</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {formatCurrency(metricsData.numOfOrders.thisMonth)}
          </CardTitle>
          <CardAction>
            {metricsData.numOfOrders.growthRate > 0 ? (
              <Badge variant='outline'>
                <IconTrendingUp />+
                {formatCurrency(metricsData.numOfOrders.growthRate)}%
              </Badge>
            ) : (
              <Badge variant='outline'>
                <IconTrendingDown />
                {formatCurrency(metricsData.numOfOrders.growthRate)}%
              </Badge>
            )}
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          {metricsData.numOfOrders.growthRate > 0 ? (
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Trending up this month <IconTrendingUp className='size-4' />
            </div>
          ) : (
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Trending down this month <IconTrendingDown className='size-4' />
            </div>
          )}
          <div className='text-muted-foreground'>
            last month was {formatCurrency(metricsData.numOfOrders.lastMonth)}
          </div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Top Seller Product</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {metricsData.topSeller.thisMonth}
          </CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            last month was {metricsData.topSeller.lastMonth}
          </div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Orders on the top seller</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {metricsData.topSellerSaleCount.thisMonth}
          </CardTitle>
          <CardAction>
            {metricsData.numOfOrders.growthRate > 0 ? (
              <Badge variant='outline'>
                <IconTrendingUp />+
                {formatCurrency(metricsData.topSellerSaleCount.growthRate)}%
              </Badge>
            ) : (
              <Badge variant='outline'>
                <IconTrendingDown />
                {formatCurrency(metricsData.topSellerSaleCount.growthRate)}%
              </Badge>
            )}
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          {metricsData.topSellerSaleCount.growthRate > 0 ? (
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Trending up this month <IconTrendingUp className='size-4' />
            </div>
          ) : metricsData.topSellerSaleCount.growthRate > 0 ? (
            <div className='line-clamp-1 flex gap-2 font-medium'>
              No growth this month
            </div>
          ) : (
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Trending down this month <IconTrendingDown className='size-4' />
            </div>
          )}
          <div className='text-muted-foreground'>
            last month was{' '}
            {formatCurrency(metricsData.topSellerSaleCount.lastMonth)}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
