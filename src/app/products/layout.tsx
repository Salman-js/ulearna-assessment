import CartContextWrapper from '@/features/cart/components/cart-context-wrapper';
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
  return <CartContextWrapper>{children}</CartContextWrapper>;
}
