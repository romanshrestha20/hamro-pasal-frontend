import { apiRequest, type ApiResponse } from "@/lib/api";
import type { Product, Favorite } from "@/lib/types";

type RequestOptions = { signal?: AbortSignal; params?: Record<string, unknown> };
const withConfig = (options?: RequestOptions) =>
  options ? { signal: options.signal, params: options.params } : undefined;

/**
 * Add product to current user's favorites
 */
export const addFavorite = (
  productId: string,
  options?: RequestOptions
): Promise<ApiResponse<Favorite>> =>
  apiRequest<Favorite>("post", `/favorites`, { productId }, withConfig(options));

/**
 * Remove a product from current user's favorites
 */
export const removeFavorite = (
  productId: string,
  options?: RequestOptions
): Promise<ApiResponse<{ message: string }>> =>
  apiRequest<{ message: string }>(
    "delete",
    `/favorites/${productId}`,
    undefined,
    withConfig(options)
  );

/**
 * Get current user's favorites (list of favorite records including product)
 */
export const getUserFavorites = (
  options?: RequestOptions
): Promise<ApiResponse<Favorite[]>> =>
  apiRequest<Favorite[]>("get", `/favorites`, undefined, withConfig(options));

/**
 * Check if a product is favorited by current user
 */
export const getFavoriteByProduct = (
  productId: string,
  options?: RequestOptions
): Promise<ApiResponse<Favorite>> =>
  apiRequest<Favorite>("get", `/favorites/${productId}`, undefined, withConfig(options));

/**
 * Toggle favorite status for a product
 */
export const toggleFavorite = (
  productId: string,
  options?: RequestOptions
): Promise<ApiResponse<{ toggled: "added" | "removed"; data: Favorite }>> =>
  apiRequest<{ toggled: "added" | "removed"; data: Favorite }>(
    "post",
    `/favorites/${productId}/toggle`,
    undefined,
    withConfig(options)
  );
