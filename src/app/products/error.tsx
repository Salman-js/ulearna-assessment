'use client';

import { Button } from '@/components/ui/button';
import { CircleAlertIcon, XIcon } from 'lucide-react';
import React from 'react';

function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className='@container/main flex flex-col justify-center items-center flex-1'>
      <div className='bg-background z-50 max-w-[400px] rounded-md border p-4 shadow-lg'>
        <div className='flex gap-2'>
          <div className='flex grow gap-3'>
            <CircleAlertIcon
              className='mt-0.5 shrink-0 text-red-500'
              size={16}
              aria-hidden='true'
            />
            <div className='flex grow flex-col gap-3'>
              <div className='space-y-1'>
                <p className='text-sm font-medium'>
                  We couldn&lsquo;t complete your request!
                </p>
                <p className='text-muted-foreground text-sm'>
                  An error occurred when trying to load this page. Please, try
                  again!
                </p>
              </div>
              <div className='space-y-1 '>
                <span className='text-sm font-medium'>Message:</span>
                <span className='text-muted-foreground text-sm px-2 rounded-sm ml-2 border'>
                  {error.message}
                </span>
              </div>
              <div className='flex gap-2'>
                <Button size='sm' onClick={() => window.location.reload()}>
                  Reload
                </Button>
              </div>
            </div>
            <Button
              variant='ghost'
              className='group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent'
              aria-label='Close notification'
            >
              <XIcon
                size={16}
                className='opacity-60 transition-opacity group-hover:opacity-100'
                aria-hidden='true'
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ErrorBoundary;
