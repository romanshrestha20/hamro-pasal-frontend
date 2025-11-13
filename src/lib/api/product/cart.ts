import { apiRequest, type ApiResponse } from "@/lib/api";
import type { Product, Category, Cart, CartItem} from "@/lib/types";


// Request options type for optional signal and params
type RequestOptions = { signal?: AbortSignal; params?: Record<string, unknown> };

// Helper to extract config from options if provided
const withConfig = (options?: RequestOptions) =>
    options ? { signal: options.signal, params: options.params } : undefined;


/**
 * Get user's cart with all items
 */
export const getUserCart = (userId: string, options?: RequestOptions) =>
    apiRequest<Cart>("get", `/cart`, undefined, withConfig(options));

/**
 * Add item to cart
 */
export const addItemToCart = (
    itemData: Partial<CartItem>,
    options?: RequestOptions
) => apiRequest<CartItem>("post", `/cart/add`, itemData, withConfig(options));

/**
 * Update cart item quantity
 */

export const updateCartItem = (
    itemId: string,
    updatedData: Partial<CartItem>,
    options?: RequestOptions
) => apiRequest<CartItem>("patch", `/cart/item/${itemId}`, updatedData, withConfig(options));

/**
 * Remove item from cart
 */

export const deleteCartItem = (
    itemId: string,
    options?: RequestOptions
) => apiRequest<CartItem>("delete", `/cart/item/${itemId}`, undefined, withConfig(options));

/**
 * Delete entire cart
 */

export const deleteCart = (cartId: string, options?: RequestOptions) =>
    apiRequest<void>("delete", `/cart`, undefined, withConfig(options));