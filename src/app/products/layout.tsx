import CartContextWrapper from '@/features/cart/components/cart-context-wrapper';
import FloatingCart from '@/features/cart/components/floating-cart';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Store',
  description: 'Browse products',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartContextWrapper>
      {children}
      <div className='fixed bottom-20 right-5' draggable>
        <FloatingCart />
      </div>
    </CartContextWrapper>
  );
}
