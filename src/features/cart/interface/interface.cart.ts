import { NewProductVariantOrder } from '@/features/order/interface/interface.order';
import { ProductVariant } from '@/features/product/interface/interface.product';

export interface ICart {
  items: NewProductVariantOrder[];
}

export interface CartContextType {
  items: NewProductVariantOrder[];
  addToCart: (item: NewProductVariantOrder) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  activeTab: string;
  openCheckout: () => void;
  openCart: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}
