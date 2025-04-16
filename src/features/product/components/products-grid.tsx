import React from 'react';
import ProductItem from './product-item';
import { IProduct } from '../interface/interface.product';

type productsGridProps = {
  products: IProduct[];
};

const ProductsGrid: React.FC<productsGridProps> = ({ products }) => {
  return (
    <div className='@container/main'>
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};
export default ProductsGrid;
