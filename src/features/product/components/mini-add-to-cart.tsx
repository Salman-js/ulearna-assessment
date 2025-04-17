'use client';

import React from 'react';
import { IProduct } from '../interface/interface.product';
import { Button } from '@/components/ui/button';
import { useCart } from '@/features/cart/hooks/use-cart';
import { NewProductVariantOrder } from '@/features/order/interface/interface.order';

type productItemProps = {
  product: IProduct;
};

const MiniAddToCartButton: React.FC<productItemProps> = ({ product }) => {
  const { addToCart } = useCart();
  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const newCartItem: NewProductVariantOrder = {
      id: Math.random().toString(),
      price: product.defaultVariant?.price ?? 0,
      productId: product.defaultVariantId,
      quantity: 1,
      productName: product.name,
      size: product.defaultVariant?.size,
      color: product.defaultVariant?.color,
    };
    addToCart(newCartItem);
  };
  return (
    <Button className='rounded-full' onClick={handleAddToCart}>
      Add to cart
    </Button>
  );
};
export default MiniAddToCartButton;
