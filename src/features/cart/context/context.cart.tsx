import { createContext, useContext, useState } from 'react';
import { CartContextType } from '../interface/interface.cart';
import { NewProductVariantOrder } from '@/features/order/interface/interface.order';
import { toast } from 'sonner';

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<NewProductVariantOrder[]>([]);

  // Add item to cart
  const addToCart = (item: NewProductVariantOrder) => {
    setItems((prevCart) => {
      const existingItem = prevCart.find(
        (i) =>
          i.productId === item.productId &&
          i.color === item.color &&
          i.size === item.size
      );
      if (existingItem) {
        return prevCart.map((i) =>
          i.productId === item.productId &&
          i.color === item.color &&
          i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prevCart, item];
    });
    toast.success(`${item.productName} added to cart!`);
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setItems((prevCart) => prevCart.filter((item) => item.id !== id));
    toast.success(`Item removed from cart!`);
  };

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    if (item.quantity + quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + quantity } : item
      )
    );
  };

  // Clear the cart
  const clearCart = () => {
    setItems([]);
    toast.success(`Cart cleared!`);
  };

  // Calculate total price
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart Context
