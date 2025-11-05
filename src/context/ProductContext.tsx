"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import type { Product, Category } from "@/lib/types";
import {
  getAllProducts as apiGetAllProducts,
  getProductById as apiGetProductById,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
  searchProducts as apiSearchProducts,
  fetchProductsByCategory as apiFetchProductsByCategory,
  fetchCategories as apiFetchCategories,
} from "@/lib/api/product";

export type ProductResult =
  | { success: true; data: Product | Product[] | Category[] }
  | { success: false; error: string };

export interface ProductContextType {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchAllProducts: (signal?: AbortSignal) => Promise<void>;
  getProductById: (productId: string, signal?: AbortSignal) => Promise<ProductResult>;
  updateProduct: (productId: string, updatedData: Partial<Product>) => Promise<ProductResult>;
  deleteProduct: (productId: string) => Promise<ProductResult>;
  searchProducts: (query: string, signal?: AbortSignal) => Promise<ProductResult>;
  fetchProductsByCategory: (categoryId: string, signal?: AbortSignal) => Promise<ProductResult>;
  fetchCategories: (signal?: AbortSignal) => Promise<ProductResult>;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  categories: [],
  loading: true,
  error: null,
  fetchAllProducts: async () => {},
  getProductById: async () => ({ success: false, error: "Not implemented" }),
  updateProduct: async () => ({ success: false, error: "Not implemented" }),
  deleteProduct: async () => ({ success: false, error: "Not implemented" }),
  searchProducts: async () => ({ success: false, error: "Not implemented" }),
  fetchProductsByCategory: async () => ({ success: false, error: "Not implemented" }),
  fetchCategories: async () => ({ success: false, error: "Not implemented" }),
});

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const productsAbortRef = useRef<AbortController | null>(null);
  const categoriesAbortRef = useRef<AbortController | null>(null);

  const fetchAllProducts = async (signal?: AbortSignal) => {
    setLoading(true);
    try {
      const response = await apiGetAllProducts({ signal });
      if (response.success && Array.isArray(response.data)) {
        setProducts(response.data);
        setError(null);
      } else {
        setError(response.error || "Failed to fetch products");
      }
    } catch (err) {
      setError("An error occurred while fetching products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async (signal?: AbortSignal): Promise<ProductResult> => {
    try {
      const response = await apiFetchCategories({ signal });
      if (response.success && Array.isArray(response.data)) {
        setCategories(response.data);
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error || "Failed to fetch categories" };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to fetch categories" };
    }
  };

  const getProductById = async (productId: string, signal?: AbortSignal): Promise<ProductResult> => {
    try {
      const response = await apiGetProductById(productId, { signal });
      if (response.success && response.data) return { success: true, data: response.data };
      return { success: false, error: response.error || "Failed to fetch product" };
    } catch {
      return { success: false, error: "Failed to fetch product" };
    }
  };

  const fetchProductsByCategory = async (categoryId: string, signal?: AbortSignal): Promise<ProductResult> => {
    try {
      const response = await apiFetchProductsByCategory(categoryId, { signal });
      if (response.success && Array.isArray(response.data)) return { success: true, data: response.data };
      return { success: false, error: response.error || "Failed to fetch products by category" };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to fetch products by category" };
    }
  };

  const searchProducts = async (query: string, signal?: AbortSignal): Promise<ProductResult> => {
    try {
      const response = await apiSearchProducts(query, { signal });
      if (response.success && Array.isArray(response.data)) return { success: true, data: response.data };
      return { success: false, error: response.error || "Failed to search products" };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to search products" };
    }
  };

  const updateProduct = async (
    productId: string,
    updatedData: Partial<Product>
  ): Promise<ProductResult> => {
    try {
      const response = await apiUpdateProduct(productId, updatedData);
      if (response.success && response.data) {
        const updated = response.data as Product; // single product expected
        setProducts((prev) => prev.map((p) => (p.id === productId ? updated : p)));
        toast.success("Product updated successfully!");
        return { success: true, data: updated };
      }
      return { success: false, error: response.error || "Failed to update product" };
    } catch {
      return { success: false, error: "An error occurred while updating product" };
    }
  };

  const deleteProduct = async (productId: string): Promise<ProductResult> => {
    try {
      const response = await apiDeleteProduct(productId);
      if (response.success) {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
        toast.success("Product deleted successfully!");
        return { success: true, data: [] };
      }
      return { success: false, error: response.error || "Failed to delete product" };
    } catch {
      return { success: false, error: "An error occurred while deleting product" };
    }
  };

  useEffect(() => {
    // Abortable initial fetches
    productsAbortRef.current?.abort();
    categoriesAbortRef.current?.abort();
    const pCtrl = new AbortController();
    const cCtrl = new AbortController();
    productsAbortRef.current = pCtrl;
    categoriesAbortRef.current = cCtrl;

    fetchAllProducts(pCtrl.signal);
    fetchCategories(cCtrl.signal);

    return () => {
      pCtrl.abort();
      cCtrl.abort();
    };
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        error,
        fetchAllProducts,
        getProductById,
        updateProduct,
        deleteProduct,
        searchProducts,
        fetchProductsByCategory,
        fetchCategories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
