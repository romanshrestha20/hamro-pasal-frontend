import { apiRequest, type ApiResponse } from "@/lib/api";
import type { Product, Category } from "@/lib/types";

// Request options type for optional signal and params
type RequestOptions = { signal?: AbortSignal; params?: Record<string, unknown> };

// Helper to extract config from options if provided
const withConfig = (options?: RequestOptions) =>
    options ? { signal: options.signal, params: options.params } : undefined;

export const getAllProducts = (options?: RequestOptions) =>
    apiRequest<Product[]>("get", "/products", undefined, withConfig(options));

export const getProductById = (productId: string, options?: RequestOptions) =>
    apiRequest<Product>("get", `/products/${productId}`, undefined, withConfig(options));

export const createProduct = (productData: Partial<Product>, options?: RequestOptions) =>
    apiRequest<Product>("post", "/products", productData, withConfig(options));

export const updateProduct = (
    productId: string,
    updatedData: Partial<Product>,
    options?: RequestOptions
) => apiRequest<Product>("put", `/products/${productId}`, updatedData, withConfig(options));

export const deleteProduct = (productId: string, options?: RequestOptions) =>
    apiRequest<void>("delete", `/products/${productId}`, undefined, withConfig(options));

export const searchProducts = (
    query: string,
    options?: RequestOptions
): Promise<ApiResponse<Product[]>> => {
    const q = query?.trim();
    if (!q) return Promise.resolve({ success: true, data: [] });
    return apiRequest<Product[]>(
        "get",
        `/products/search/${encodeURIComponent(q)}`,
        undefined,
        withConfig(options)
    );
};

export const fetchProductsByCategory = (
    categoryId: string,
    options?: RequestOptions
): Promise<ApiResponse<Product[]>> =>
    apiRequest<Product[]>(
        "get",
        `/products/category/${encodeURIComponent(categoryId)}`,
        undefined,
        withConfig(options)
    );

export const fetchCategories = (
    options?: RequestOptions
): Promise<ApiResponse<Category[]>> =>
    apiRequest<Category[]>("get", "/products/categories", undefined, withConfig(options));
