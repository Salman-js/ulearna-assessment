'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useSeed } from '../hooks/use-seed';
import { IconDatabaseSearch } from '@tabler/icons-react';

export default function Checker() {
  const { isChecking, check } = useSeed();

  return (
    <Button onClick={check} disabled={isChecking} variant='outline' size='icon'>
      {isChecking ? (
        <Loader2 className='animate-spin' />
      ) : (
        <IconDatabaseSearch />
      )}
    </Button>
  );
}
