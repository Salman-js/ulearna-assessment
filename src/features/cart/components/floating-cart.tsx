'use client';

import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from '@/components/ui/popover';
import Cart from './cart';
import { ShoppingBasket } from 'lucide-react';
import { useCart } from '../hooks/use-cart';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Checkout from './checkout';

export default function FloatingCart() {
  const { items } = useCart();
  const itemsCount = items?.length ?? 0;
  const [isShaking, setIsShaking] = useState(false);
  const [activeTab, setActiveTab] = useState<'cart' | 'checkout'>('cart');

  useEffect(() => {
    if (itemsCount) {
      setIsShaking(true);
      const timeout = setTimeout(() => setIsShaking(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [itemsCount]);
  const onTabChange = (tab: 'cart' | 'checkout') => {
    setActiveTab(tab);
  };
  return (
    <PopoverRoot>
      <div className='relative'>
        <PopoverTrigger variant='outline' size='icon'>
          <ShoppingBasket
            className={cn('w-24 h-24', isShaking ? 'animate-shake' : '')}
          />
        </PopoverTrigger>
        <Badge className='border-background absolute -top-1.5 left-full min-w-5 -translate-x-3.5 px-1'>
          {itemsCount}
        </Badge>
      </div>
      <PopoverContent className='bottom-0 right-0'>
        <PopoverBody>
          {activeTab === 'cart' ? (
            <Cart onTabChange={onTabChange} />
          ) : (
            <Checkout onTabChange={onTabChange} />
          )}
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
}
