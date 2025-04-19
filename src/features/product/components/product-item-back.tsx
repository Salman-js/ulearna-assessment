import React from 'react';
import { IProduct } from '../interface/interface.product';
import { FlipCardBack } from '@/components/ui/flip-card';
import { MiniSizeToggle } from './mini-size-toggle';
import MiniAddToCartButton from './mini-add-to-cart';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type productItemProps = {
  product: IProduct;
};

const ProductItemBack: React.FC<productItemProps> = ({ product }) => {
  return (
    <FlipCardBack
      className='rounded-3xl bg-cover bg-center bg-no-repeat shadow-xs overflow-hidden'
      style={{
        backgroundImage: `url(/assets/products/${product?.category}/${product?.defaultVariant?.color}/back.png)`,
      }}
    >
      <div className='w-full h-full flex flex-col items-center justify-center bg-gradient-to-t from-secondary from-5% to-transparent to-95%'>
        <div className='w-full h-full flex flex-col items-center justify-center rounded-xl text-center gap-3'>
          <Link href={`/products/${product?.id}`}>
            <Button variant='link' size='lg' className='text-lg'>
              {product?.name}
            </Button>
          </Link>
          <div className='flex flex-row gap-3'>
            <span>SM</span>
            <Separator orientation='vertical' />
            <span>M</span>
            <Separator orientation='vertical' />
            <span>LG</span>
          </div>
          <div className='mb-3'>
            <h4>$ {product?.defaultVariant?.price}</h4>
          </div>
          <MiniAddToCartButton product={product} />
        </div>
      </div>
    </FlipCardBack>
  );
};
export default ProductItemBack;
