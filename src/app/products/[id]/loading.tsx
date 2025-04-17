import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Slash } from 'lucide-react';

const LoadingLayout = () => {
  return (
    <div className='@container/main flex flex-col flex-1 p-6 gap-6'>
      <div className='w-full flex flex-row gap-2'>
        <Skeleton className='w-28 h-6 bg-secondary' /> <Slash />{' '}
        <Skeleton className='w-28 h-6 bg-secondary' /> <Slash />{' '}
        <Skeleton className='w-28 h-6 bg-secondary' />
      </div>
      <Separator className='bg-accent' />
      <div className='w-full lg:w-4/5 grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 mt-4 gap-3'>
        <div className='w-full flex flex-col gap-2'>
          <Skeleton className='w-full h-96 rounded-xl bg-secondary' />
          <div className='w-full flex flex-row justify-center gap-3'>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                className='w-20 h-20 rounded-sm bg-secondary'
                key={index}
              />
            ))}
          </div>
        </div>
        <div className='w-full flex flex-col items-start gap-2'>
          <Skeleton className='w-32 h-8 bg-secondary' />
          <Skeleton className='w-16 h-8 bg-secondary' />
          <Skeleton className='w-44 h-8 bg-secondary' />
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton className='w-full h-8 bg-secondary' key={index} />
          ))}
          <Skeleton className='w-1/2 h-8 bg-secondary' />
        </div>
      </div>
    </div>
  );
};

export default LoadingLayout;
