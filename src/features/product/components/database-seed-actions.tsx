'use client';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { IconDatabase } from '@tabler/icons-react';
import { useSeed } from '../hooks/use-seed';
import { Loader2 } from 'lucide-react';

export function DatabaseSeedActions() {
  const { seed, purge, isPending } = useSeed();
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className='space-x-2' disabled={isPending}>
          {isPending ? (
            <Loader2 className='animate-spin mr-2 w-5 h-5' />
          ) : (
            <IconDatabase className='mr-2 w-5 h-5' />
          )}{' '}
          {isPending ? 'Processing...' : 'Database Actions'}
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={seed} disabled={isPending}>
            Generate Data
          </MenubarItem>
          <MenubarItem onClick={purge} disabled={isPending}>
            Purge Data
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
