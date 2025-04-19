import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Slash } from 'lucide-react';

const LoadingLayout = () => {
  return (
    <div className='@container/main flex flex-col flex-1 p-6 gap-6'>
      <div className='w-full flex flex-row gap-2'>
        <Skeleton className='w-28 h-6' /> <Slash />{' '}
        <Skeleton className='w-28 h-6' />
      </div>
      <Separator className='bg-accent' />
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 mt-4 gap-3'>
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton className='w-full h-64 rounded-xl' key={index} />
        ))}
      </div>
    </div>
  );
};

export default LoadingLayout;
