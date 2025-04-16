'use client';

import { getRouteTitle } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const HeaderTitle: React.FC = () => {
  const pathname = usePathname();
  const [currentRoute, setCurrentRoute] = useState<string | null>(null);

  useEffect(() => {
    setCurrentRoute(pathname);
  }, [pathname]);

  if (!currentRoute) {
    return <h1 className='text-base font-medium'></h1>;
  }

  return (
    <h1 className='text-base font-medium'>{getRouteTitle(currentRoute)}</h1>
  );
};

export default HeaderTitle;
