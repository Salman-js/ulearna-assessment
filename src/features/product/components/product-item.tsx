import React from 'react';
import { IProduct } from '../interface/interface.product';
import { FlipCard } from '@/components/ui/flip-card';
import ProductItemFront from './product-item-front';
import ProductItemBack from './product-item-back';

type productItemProps = {
  product: IProduct;
};

const ProductItem: React.FC<productItemProps> = ({ product }) => {
  return (
    <FlipCard className='h-96 w-full'>
      <ProductItemFront product={product} />
      <ProductItemBack product={product} />
    </FlipCard>
  );
};
export default ProductItem;
