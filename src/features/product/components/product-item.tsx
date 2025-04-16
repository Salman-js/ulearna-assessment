import React from 'react';
import { IProduct } from '../interface/interface.product';
import {
  FlipCard,
  FlipCardBack,
  FlipCardFront,
} from '@/components/ui/flip-card';
import { Button } from '@/components/ui/button';

type productItemProps = {
  product: IProduct;
};

const ProductItem: React.FC<productItemProps> = ({ product }) => {
  return (
    <div className='overflow-visible'>
      <FlipCard className='h-96 w-full'>
        <FlipCardFront className='rounded-xl shadow-md backdrop-blur-15'>
          <img
            width={1015}
            height={678}
            src={`/assets/products/${product?.category}/${product?.defaultVariant.color}.png`}
            alt={product?.name}
            className='size-full object-cover'
          />
        </FlipCardFront>
        <FlipCardBack
          className='flex flex-col items-center justify-center rounded-xl px-4 py-6 text-center text-white bg-cover bg-center bg-no-repeat backdrop-blur-15 shadow-md'
          style={{
            backgroundImage: `url(/assets/products/${product?.category}/${product?.defaultVariant.color}.png)`,
            backdropFilter: 'blur(15px)',
          }}
        >
          <h2 className='text-xl font-bold'>{product?.name}</h2>
          <h4 className='mb-4'>{product?.name}</h4>
          <Button className='rounded-full'>Add to cart</Button>
        </FlipCardBack>
      </FlipCard>
    </div>
  );
};
export default ProductItem;
