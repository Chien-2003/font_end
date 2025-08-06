'use client';

import { getUserCart } from '@/services/cartApi';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface CartItem {
  id: string;
  variant_id: string;
  quantity: number;
  variant?: {
    id: string;
    color: string;
    size: string;
    quantity: number;
    product: {
      id: string;
      name: string;
      price: string;
      image_url: string[];
    };
  };
}

interface CartContextType {
  cartItems: CartItem[];
  refreshCart: () => Promise<void>;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(true);

  const refreshCart = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getUserCart();
      setCartItems(data);
    } catch (error) {
      console.error('Lỗi lấy giỏ hàng:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  return (
    <CartContext.Provider
      value={{ cartItems, refreshCart, setCartItems, isLoading }}
    >
      {children}
    </CartContext.Provider>
  );
};
