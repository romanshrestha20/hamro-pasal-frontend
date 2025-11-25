"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
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
} from "@/lib/api/product/index";

// Typed API result
export type ProductResult =
  | { success: true; data: Product | Product[] | Category[] }
  | { success: false; error: string };

interface ProductContextType {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;

  fetchAllProducts: (signal?: AbortSignal) => Promise<void>;
  getProductById: (id: string, signal?: AbortSignal) => Promise<ProductResult>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<ProductResult>;
  deleteProduct: (id: string) => Promise<ProductResult>;
  searchProducts: (q: string, signal?: AbortSignal) => Promise<ProductResult>;
  fetchProductsByCategory: (
    id: string,
    signal?: AbortSignal
  ) => Promise<ProductResult>;
  fetchCategories: (signal?: AbortSignal) => Promise<ProductResult>;
}

// Default context (never used, only for TS)
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
  fetchProductsByCategory: async () => ({
    success: false,
    error: "Not implemented",
  }),
  fetchCategories: async () => ({ success: false, error: "Not implemented" }),
});

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // AbortControllers to avoid memory leaks
  const productsAbortRef = useRef<AbortController | null>(null);
  const categoriesAbortRef = useRef<AbortController | null>(null);

  /*************************************************
   * 🔥 Universal request handler
   *************************************************/
  const handleApi = useCallback(
    async <T,>(
      apiFn: (...args: any[]) => Promise<any>,
      args: any[],
      onSuccess?: (data: T) => void
    ): Promise<ProductResult> => {
      try {
        const res = await apiFn(...args);

        if (res.success) {
          if (onSuccess) onSuccess(res.data);
          return { success: true, data: res.data };
        }

        return { success: false, error: res.error || "Request failed" };
      } catch (err: any) {
        return { success: false, error: err.message || "Request error" };
      }
    },
    []
  );

  /*************************************************
   * FETCH ALL PRODUCTS
   *************************************************/
  const fetchAllProducts = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      const result = await handleApi<Product[]>(
        apiGetAllProducts,
        [{ signal }],
        (data) => setProducts(data)
      );

      setError(result.success ? null : result.error);
      setLoading(false);
    },
    [handleApi]
  );

  /*************************************************
   * FETCH CATEGORIES
   *************************************************/
  const fetchCategories = useCallback(
    async (signal?: AbortSignal) =>
      handleApi<Category[]>(apiFetchCategories, [{ signal }], (data) =>
        setCategories(data)
      ),
    [handleApi]
  );

  /*************************************************
   * GET PRODUCT BY ID
   *************************************************/
  const getProductById = useCallback(
    async (productId: string, signal?: AbortSignal) =>
      handleApi<Product>(apiGetProductById, [productId, { signal }]),
    [handleApi]
  );

  /*************************************************
   * SEARCH PRODUCTS
   *************************************************/
  const searchProducts = useCallback(
    async (query: string, signal?: AbortSignal) =>
      handleApi<Product[]>(apiSearchProducts, [query, { signal }]),
    [handleApi]
  );

  /*************************************************
   * FETCH BY CATEGORY
   *************************************************/
  const fetchProductsByCategory = useCallback(
    async (categoryId: string, signal?: AbortSignal) =>
      handleApi<Product[]>(apiFetchProductsByCategory, [
        categoryId,
        { signal },
      ]),
    [handleApi]
  );

  /*************************************************
   * UPDATE PRODUCT
   *************************************************/
  const updateProduct = useCallback(
    async (productId: string, data: Partial<Product>) =>
      handleApi<Product>(apiUpdateProduct, [productId, data], (updated) => {
        setProducts((p) =>
          p.map((prod) => (prod.id === productId ? updated : prod))
        );
        toast.success("Product updated!");
      }),
    [handleApi]
  );

  /*************************************************
   * DELETE PRODUCT
   *************************************************/
  const deleteProduct = useCallback(
    async (productId: string) =>
      handleApi(apiDeleteProduct, [productId], () => {
        setProducts((p) => p.filter((item) => item.id !== productId));
        toast.success("Product deleted!");
      }),
    [handleApi]
  );

  /*************************************************
   * INITIAL LOAD
   *************************************************/
  useEffect(() => {
    // abort previous
    productsAbortRef.current?.abort();
    categoriesAbortRef.current?.abort();

    // new controllers
    const pCtrl = new AbortController();
    const cCtrl = new AbortController();
    productsAbortRef.current = pCtrl;
    categoriesAbortRef.current = cCtrl;

    // defer async work to avoid synchronous setState in effect body
    let mounted = true;
    Promise.resolve().then(() => {
      if (!mounted) return;
      void fetchAllProducts(pCtrl.signal);
      void fetchCategories(cCtrl.signal);
    });

    return () => {
      mounted = false;
      pCtrl.abort();
      cCtrl.abort();
    };
  }, [fetchAllProducts, fetchCategories]);

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
