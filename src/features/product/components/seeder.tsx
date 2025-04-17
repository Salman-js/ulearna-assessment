'use client';

import { Button } from '@/components/ui/button';
import { DatabaseZap, Loader2 } from 'lucide-react';
import { useSeed } from '../hooks/use-seed';

export default function Seeder() {
  const { error, success, seed, isPending } = useSeed();

  return (
    <div className='flex flex-row items-center'>
      <div>
        {success && (
          <p className='mt-2 text-green-600'>Database seeded successfully!</p>
        )}
      </div>
      <div>{error && <p className='mt-2 text-red-600'>Error: {error}</p>}</div>
      <Button onClick={seed} disabled={isPending}>
        {isPending ? <Loader2 className='animate-spin' /> : <DatabaseZap />}
        {isPending ? 'Seeding...' : 'Seed Database'}
      </Button>
    </div>
  );
}
