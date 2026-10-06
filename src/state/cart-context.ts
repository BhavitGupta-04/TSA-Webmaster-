import { createContext, useContext } from 'react';
import type { CartState } from '../types/cart';

export const CartContext = createContext<CartState | null>(null);

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error('useCart must be used inside a CartProvider');
  return cart;
}
