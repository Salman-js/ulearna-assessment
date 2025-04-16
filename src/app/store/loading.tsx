import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Slash } from 'lucide-react';

const LoadingLayout = () => {
  return (
    <div className='@container/main flex flex-col flex-1 p-6 gap-6'>
      <div className='w-full flex flex-row gap-2'>
        <Skeleton className='w-28 h-12' /> <Slash />{' '}
        <Skeleton className='w-28 h-12' /> <Slash />{' '}
        <Skeleton className='w-28 h-12' />
      </div>
      <Separator className='bg-accent' />
      <div className='@container/main columns-1 lg:columns-3 md:columns-2 xl:columns-4 mt-4 gap-3'>
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton className='w-full h-96 rounded-xl' key={index} />
        ))}
      </div>
    </div>
  );
};

export default LoadingLayout;
