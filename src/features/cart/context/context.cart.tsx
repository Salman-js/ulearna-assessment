import { createContext, useReducer } from 'react';
import { CartContextType } from '../interface/interface.cart';
import { NewProductVariantOrder } from '@/features/order/interface/interface.order';
import { toast } from 'sonner';

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

type CartAction =
  | { type: 'ADD_TO_CART'; payload: NewProductVariantOrder }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_ACTIVE_TAB'; payload: 'cart' | 'checkout' }
  | { type: 'SET_LOADING'; payload: boolean };

interface CartState {
  items: NewProductVariantOrder[];
  activeTab: 'cart' | 'checkout';
  loading: boolean;
}

// Initial state
const initialState: CartState = {
  items: [],
  activeTab: 'cart',
  loading: false,
};

// Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) =>
          i.productId === item.productId &&
          i.color === item.color &&
          i.size === item.size
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.productId === item.productId &&
            i.color === item.color &&
            i.size === item.size
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, item],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (!item) return state;
      if (item.quantity + quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== id),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Add item to cart
  const addToCart = (item: NewProductVariantOrder) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
    toast.success(`${item.productName} added to cart!`);
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    toast.success(`Item removed from cart!`);
  };

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  // Clear the cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success(`Cart cleared!`);
  };

  const openCheckout = () => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: 'checkout' });
  };

  const openCart = () => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: 'cart' });
  };

  const setLoading = (value: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: value });
  };

  // Calculate total price
  const totalPrice = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        activeTab: state.activeTab,
        openCheckout,
        openCart,
        loading: state.loading,
        setLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
