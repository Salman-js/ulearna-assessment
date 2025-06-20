import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading: React.FC = () => {
  return (
    <main aria-label='loading-nav' className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton className='w-full h-32' key={i} />
            ))}
          </div>
          <div className='px-4 lg:px-14'>
            <Skeleton className='w-full h-72' />
          </div>
          <div className='flex flex-col w-full px-4 gap-2'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton className='w-full h-18' key={i} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
export default Loading;
