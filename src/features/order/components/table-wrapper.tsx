import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
type tableWrapperProps = {
  children: React.ReactNode;
  isLoading: boolean;
};
const TableWrapper: React.FC<tableWrapperProps> = ({ children, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className='flex flex-col w-full px-4 gap-2'>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton className='w-full h-18' key={i} />
          ))}
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default TableWrapper;
