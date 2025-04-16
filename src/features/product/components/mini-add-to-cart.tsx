'use client';

import React from 'react';
import { IProduct } from '../interface/interface.product';
import { Button } from '@/components/ui/button';

type productItemProps = {
  product: IProduct;
};

const MiniAddToCartButton: React.FC<productItemProps> = ({ product }) => {
  return (
    <Button className='rounded-full' onClick={(e) => e.preventDefault()}>
      Add to cart
    </Button>
  );
};
export default MiniAddToCartButton;
