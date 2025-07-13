'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { getUserCart } from '@/lib/cartApi';

export interface CartItem {
  id: number;
  variant_id: number;
  quantity: number;
  variant?: {
    id: number;
    color: string;
    size: string;
    quantity: number;
    product: {
      id: number;
      name: string;
      price: string;
      image_url: string;
    };
  };
}

interface CartContextType {
  cartItems: CartItem[];
  refreshCart: () => Promise<void>;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const refreshCart = useCallback(async () => {
    try {
      const data = await getUserCart();
      setCartItems(data);
    } catch (error) {
      console.error('Lỗi lấy giỏ hàng:', error);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  return (
    <CartContext.Provider
      value={{ cartItems, refreshCart, setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
