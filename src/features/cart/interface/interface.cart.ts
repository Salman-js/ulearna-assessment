import { ProductVariant } from '@/features/product/interface/interface.product';

export interface ICart {
  items: ProductVariant[];
}

export interface CartContextType {
  items: ProductVariant[];
  addToCart: (item: ProductVariant) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
}
