import React from 'react';
import ProductItem from './product-item';
import { IProduct } from '../interface/interface.product';

type productsGridProps = {
  products: IProduct[];
};

const ProductsGrid: React.FC<productsGridProps> = ({ products }) => {
  return (
    <div className='@container/main columns-1 lg:columns-4 md:columns-2 mt-4 gap-3'>
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};
export default ProductsGrid;
