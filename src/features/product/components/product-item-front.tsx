import React from 'react';
import { IProduct } from '../interface/interface.product';
import { FlipCardFront } from '@/components/ui/flip-card';

type productItemProps = {
  product: IProduct;
};

const ProductItemFront: React.FC<productItemProps> = ({ product }) => {
  return (
    <FlipCardFront className='rounded-3xl shadow-xs backdrop-blur-15'>
      <div
        className='w-full h-full bg-cover bg-center bg-no-repeat flex flex-col justify-end'
        style={{
          backgroundImage: `url(/assets/products/${product?.category}/${product?.defaultVariant?.color}/front.png)`,
        }}
      >
        <div className='w-full h-full flex flex-col justify-end items-start p-4 bg-gradient-to-t from-secondary from-5% to-transparent to-95%'>
          <div className='w-full flex flex-row justify-between items-end'>
            <div>
              <h2 className='text-2xl font-bold'>{product?.name}</h2>
              <h4 className='text-lg font-semibold text-secondary-foreground'>
                {product?.shortDescription}
              </h4>
            </div>
            <div>
              <span className='text-2xl font-bold'>
                <span className='text-base font-normal px-1'>$</span>
                {product?.defaultVariant?.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </FlipCardFront>
  );
};
export default ProductItemFront;
