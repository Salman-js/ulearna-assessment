'use client';

import { Button } from '@/components/ui/button';
import { DatabaseBackup, Loader2 } from 'lucide-react';
import { useSeed } from '../hooks/use-seed';

export default function Purger() {
  const { error, success, purge, isPending } = useSeed();

  return (
    <div className='flex flex-row items-center gap-3'>
      <div>
        {success && (
          <p className='mt-2 text-green-600'>Database purged successfully!</p>
        )}
      </div>
      <div>{error && <p className='mt-2 text-red-600'>Error: {error}</p>}</div>
      <Button onClick={purge} disabled={isPending} variant='destructive'>
        {isPending ? <Loader2 className='animate-spin' /> : <DatabaseBackup />}
        {isPending ? 'Purging...' : 'Purge Database'}
      </Button>
    </div>
  );
}
