'use client';

import React from 'react';
import ProductItem from './product-item';
import { IProduct } from '../interface/interface.product';
import { useFetchProducts } from '../api/api.product';
import FloatingCart from '@/features/cart/components/floating-cart';

type productsGridProps = {
  products: IProduct[];
};

const ProductsGrid: React.FC<productsGridProps> = ({ products }) => {
  const { data } = useFetchProducts(products);
  return (
    <div className='@container/main columns-1 lg:columns-3 md:columns-2 xl:columns-4 mt-4'>
      {data?.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};
export default ProductsGrid;
