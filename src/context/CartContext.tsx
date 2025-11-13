"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Cart, CartItem } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";

import {
  getUserCart,
  addItemToCart,
  updateCartItem,
  deleteCartItem,
  deleteCart,
} from "@/lib/api/product/cart";

// Result type for cart operations
export type CartResult =
  | { success: true; data?: Cart | CartItem | CartItem[] }
  | { success: false; error: string };

export interface CartContextType {
  cart: Cart | null;
  items: CartItem[];
  loading: boolean;
  error: string | null;

  fetchUserCart: (signal?: AbortSignal) => Promise<CartResult>;
  addToCart: (productId: string, quantity?: number) => Promise<CartResult>;
  updateQty: (itemId: string, quantity: number) => Promise<CartResult>;
  removeItem: (itemId: string) => Promise<CartResult>;
  clearCart: () => Promise<CartResult>;
}

// Create the CartContext with default null value
export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth() as { user: { id?: string } | null };

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract items from cart safely
  const items: CartItem[] = cart?.items ?? [];

  // ---- Fetch full cart ----
  const fetchUserCart = async (signal?: AbortSignal): Promise<CartResult> => {
    if (!user?.id) {
      setCart(null);
      setLoading(false);
      return { success: false, error: "Not authenticated" };
    }

    try {
      setLoading(true);
      setError(null);
      const response = await getUserCart(user.id, { signal });
      if (response.success && response.data) {
        setCart(response.data as Cart);
        return { success: true, data: response.data as Cart };
      }

      const message = response.error || "Failed to fetch cart";
      setError(message);
      return { success: false, error: message };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch cart";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetch cart when user becomes available
    if (!user) return;
    let abort = false;
    (async () => {
      if (abort) return;
      await fetchUserCart();
    })();
    return () => {
      abort = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // ---- Mutations always refresh full cart ----
  const addToCart = async (
    productId: string,
    quantity: number = 1
  ): Promise<CartResult> => {
    if (!user?.id) return { success: false, error: "Not authenticated" };
    try {
      const response = await addItemToCart({ productId, quantity });
      if (response.success) {
        await fetchUserCart();
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error || "Failed to add to cart" };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to add to cart";
      return { success: false, error: message };
    }
  };

  const updateQty = async (itemId: string, quantity: number): Promise<CartResult> => {
    if (!user?.id) return { success: false, error: "Not authenticated" };
    try {
      const response = await updateCartItem(itemId, { quantity });
      if (response.success) {
        await fetchUserCart();
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error || "Failed to update item" };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update item";
      return { success: false, error: message };
    }
  };

  const removeItem = async (itemId: string): Promise<CartResult> => {
    if (!user?.id) return { success: false, error: "Not authenticated" };
    try {
      const response = await deleteCartItem(itemId);
      if (response.success) {
        await fetchUserCart();
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error || "Failed to remove item" };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to remove item";
      return { success: false, error: message };
    }
  };

  const clearCart = async (): Promise<CartResult> => {
    if (!user?.id) return { success: false, error: "Not authenticated" };
    if (!cart?.id) return { success: false, error: "No cart to clear" };
    try {
      const response = await deleteCart(cart.id);
      if (response.success) {
        await fetchUserCart();
        return { success: true };
      }
      return { success: false, error: response.error || "Failed to clear cart" };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to clear cart";
      return { success: false, error: message };
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        items,
        loading,
        error,
        fetchUserCart,
        addToCart,
        updateQty,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
