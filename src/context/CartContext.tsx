"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import type { Cart, CartItem, Product } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { useProductContext } from "@/context/ProductContext";

import {
  getUserCart,
  addItemToCart,
  updateCartItem,
  deleteCartItem,
  deleteCart,
} from "@/lib/api/product/cart";

export type CartResult =
  | { success: true; data?: Cart | CartItem | CartItem[] }
  | { success: false; error: string };

export interface CartContextType {
  cart: Cart | null;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  loading: boolean;
  error: string | null;

  fetchUserCart: (signal?: AbortSignal) => Promise<CartResult>;
  addToCart: (productId: string, quantity?: number) => Promise<CartResult>;
  updateQty: (itemId: string, quantity: number) => Promise<CartResult>;
  removeItem: (itemId: string) => Promise<CartResult>;
  clearCart: () => Promise<CartResult>;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const { products } = useProductContext();

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const LOCAL_CART_KEY = "hp_local_cart_v1";

  const loadLocalCart = (): Cart | null => {
    try {
      const raw = localStorage.getItem(LOCAL_CART_KEY);
      return raw ? (JSON.parse(raw) as Cart) : null;
    } catch {
      return null;
    }
  };

  const saveLocalCart = (c: Cart | null) => {
    try {
      if (!c) localStorage.removeItem(LOCAL_CART_KEY);
      else localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(c));
    } catch {}
  };

  const items = useMemo(() => cart?.items ?? [], [cart]);

  // ---------------------------
  // Fetch cart for logged-in/guest
  // ---------------------------
  const fetchUserCart = useCallback(async (): Promise<CartResult> => {
    if (!user?.id) {
      const local = loadLocalCart();
      setCart(local);
      setLoading(false);
      return { success: true, data: local || undefined };
    }

    try {
      setLoading(true);
      setError(null);

      const response = await getUserCart(user.id);
      if (response.success && response.data) {
        // Unwrap nested backend response if double-wrapped
        const raw = response.data as unknown as {
          success?: boolean;
          data?: Cart;
        };
        const cartData =
          raw?.data && (raw.data as Cart).items
            ? raw.data
            : (raw as unknown as Cart);
        setCart(cartData);
        return { success: true, data: cartData };
      }

      setError(response.error || "Failed to fetch cart");
      return {
        success: false,
        error: response.error || "Failed to fetch cart",
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to fetch cart";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // ---------------------------
  // AUTH GATE: Wait until auth finished
  // ---------------------------
  useEffect(() => {
    if (authLoading) return;
    fetchUserCart();
  }, [authLoading, fetchUserCart]);

  // ---------------------------
  // Merge guest cart → server cart
  // ---------------------------
  const mergedOnceRef = useRef(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user?.id) return;
    if (mergedOnceRef.current) return;

    const local = loadLocalCart();
    if (!local?.items?.length) {
      mergedOnceRef.current = true;
      return;
    }

    (async () => {
      try {
        await Promise.all(
          (local.items ?? []).map((it) =>
            addItemToCart({
              productId: it.productId,
              quantity: it.quantity,
            })
          )
        );
        saveLocalCart(null);
        await fetchUserCart();
      } finally {
        mergedOnceRef.current = true;
      }
    })();
  }, [authLoading, user?.id, fetchUserCart]);

  // ---------------------------
  // MUTATIONS
  // ---------------------------

  const addToCart = useCallback(
    async (productId: string, quantity = 1): Promise<CartResult> => {
      if (!user?.id) {
        try {
          setCart((prev) => {
            const local = prev ||
              loadLocalCart() || {
                id: localStorage.getItem("hp_cart_id") ?? crypto.randomUUID(),

                userId: "",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                items: [],
              };

            if (!local.items) local.items = [];
            const existing = local.items.find(
              (it) => it.productId === productId
            );
            if (existing) {
              existing.quantity += quantity;
              existing.updatedAt = new Date().toISOString();
            } else {
              const prod = products.find((p) => p.id === productId);
              const price = prod ? Number(prod.price) : 0;
              const newItem: CartItem = {
                id: `local-item-${productId}`,
                cartId: local.id,
                productId,
                quantity,
                unitPrice: price,
                currency: "USD",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                product: prod as Product,
              };
              local.items.push(newItem);
            }
            local.updatedAt = new Date().toISOString();
            saveLocalCart(local);
            return { ...local };
          });
          return { success: true };
        } catch {
          return { success: false, error: "Failed to add item" };
        }
      }

      const response = await addItemToCart({ productId, quantity });
      if (response.success) {
        await fetchUserCart();
        return { success: true, data: response.data };
      }
      return {
        success: false,
        error: response.error || "Failed to add item",
      };
    },
    [user?.id, products, fetchUserCart]
  );

  const updateQty = useCallback(
    async (itemId: string, quantity: number): Promise<CartResult> => {
      if (!user?.id) {
        // Guest cart quantity update
        setCart((prev) => {
          if (!prev) return prev;
          const next = { ...prev, items: [...(prev.items ?? [])] };
          const target = next.items.find((i) => i.id === itemId);
          if (target) {
            target.quantity = quantity;
            target.updatedAt = new Date().toISOString();
            next.updatedAt = new Date().toISOString();
          }
          saveLocalCart(next);
          return next;
        });
        return { success: true };
      }

      // Optimistic update for authenticated user
      setCart((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          items: (prev.items ?? []).map((i) =>
            i.id === itemId ? { ...i, quantity } : i
          ),
        };
      });

      const item = items.find((it) => it.id === itemId);
      if (!item) return { success: false, error: "Item not found" };

      const response = await updateCartItem(itemId, {
        productId: item.productId,
        quantity,
      });

      if (response.success) return { success: true, data: response.data };

      // Rollback on error
      await fetchUserCart();
      return {
        success: false,
        error: response.error || "Failed to update item",
      };
    },
    [user?.id, items, fetchUserCart]
  );

  const removeItem = useCallback(
    async (itemId: string): Promise<CartResult> => {
      if (!user?.id) {
        const local = loadLocalCart();
        if (!local) return { success: false, error: "No local cart" };
        local.items = (local.items ?? []).filter((it) => it.id !== itemId);
        local.updatedAt = new Date().toISOString();
        setCart({ ...local });
        saveLocalCart(local);
        return { success: true };
      }

      const item = items.find((it) => it.id === itemId);
      if (!item) return { success: false, error: "Item not found" };

      // Optimistic removal
      setCart((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          items: (prev.items ?? []).filter((i) => i.id !== itemId),
        };
      });

      const response = await deleteCartItem(item.productId);
      if (response.success) return { success: true };

      // Rollback
      await fetchUserCart();
      return {
        success: false,
        error: response.error || "Failed to remove item",
      };
    },
    [user?.id, items, fetchUserCart]
  );

  const clearCart = useCallback(async (): Promise<CartResult> => {
    if (!user?.id) {
      saveLocalCart(null);
      setCart(null);
      return { success: true };
    }
    if (!cart?.id) return { success: false, error: "No cart to clear" };
    const response = await deleteCart(cart.id);
    if (response.success) {
      await fetchUserCart();
      return { success: true };
    }
    return {
      success: false,
      error: response.error || "Failed to clear cart",
    };
  }, [user?.id, cart?.id, fetchUserCart]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const toNumber = (val: unknown) => {
    if (val == null) return 0;

    // Prisma Decimal case
    if (typeof val === "object" && "toString" in val) {
      return parseFloat(val.toString());
    }

    if (typeof val === "string") return parseFloat(val);
    if (typeof val === "number") return val;

    return 0;
  };

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        const price = item.unitPrice
          ? toNumber(item.unitPrice)
          : toNumber(item.product?.price);
        return sum + item.quantity * price;
      }, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        items,
        totalItems,
        subtotal,
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
