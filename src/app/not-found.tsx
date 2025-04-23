'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

function NotFound() {
  return (
    <main className='grid min-h-full place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8'>
      <div className='text-center'>
        <p className='text-base font-semibold text-accent-foreground'>404</p>
        <h1 className='mt-4 text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-7xl'>
          Page not found
        </h1>
        <p className='mt-6 text-lg font-medium text-pretty text-accent-foreground sm:text-xl/8'>
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className='mt-10 flex items-center justify-center gap-x-1'>
          <Link
            href='/products'
            className='rounded-md px-3.5 py-2.5 text-sm font-semibold  shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 '
          >
            <Button variant='default'>Go back</Button>
          </Link>
          <Button variant='outline' onClick={() => window.location.reload()}>
            Try again
          </Button>
        </div>
      </div>
    </main>
  );
}
export default NotFound;
