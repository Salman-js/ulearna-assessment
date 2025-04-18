import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

type metricsWrapperProps = {
  children: React.ReactNode;
  isLoading: boolean;
};

const MetricsWrapper: React.FC<metricsWrapperProps> = ({
  children,
  isLoading,
}) => {
  return (
    <>
      {isLoading ? (
        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton className='w-full h-38' key={i} />
          ))}
        </div>
      ) : (
        children
      )}
    </>
  );
};
export default MetricsWrapper;
