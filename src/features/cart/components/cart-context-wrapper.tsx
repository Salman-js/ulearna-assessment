'use client';
import React from 'react';
import { CartProvider } from '../context/context.cart';

const CartContextWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <CartProvider>{children}</CartProvider>;
};

export default CartContextWrapper;
