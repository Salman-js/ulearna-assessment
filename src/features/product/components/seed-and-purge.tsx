'use client';

import { useSeed } from '../hooks/use-seed';
import Checker from './checker';
import Purger from './purger';
import Seeder from './seeder';

export default function SeedAndPurge() {
  const { hasData, isChecking } = useSeed();
  return isChecking ? (
    'Loading...'
  ) : (
    <div className='flex flex-row gap-2 items-center'>
      {hasData ? <Purger /> : <Seeder />}
      <Checker />
    </div>
  );
}
