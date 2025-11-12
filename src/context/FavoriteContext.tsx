"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import type { Product, Favorite } from "@/lib/types";

import {
  addFavorite as addFavoriteApi,
  removeFavorite as removeFavoriteApi,
  getUserFavorites as getUserFavoritesApi,
  toggleFavorite as toggleFavoriteApi,
  getFavoriteByProduct as getFavoriteByProductApi,
} from "@/lib/api/product/favorite";

// Define a typed result for favorite actions to ensure consistent return types
export type FavoriteResult =
  | { success: true; data: Favorite | Favorite[] }
  | { success: false; error: string };

export interface FavoriteContextType {
  favorites: Favorite[];
  loading: boolean;
  error: string | null;

  fetchUserFavorites: (signal?: AbortSignal) => Promise<void>;
  addFavorite: (productId: string) => Promise<FavoriteResult>;
  removeFavorite: (productId: string) => Promise<FavoriteResult>;
  toggleFavorite: (productId: string) => Promise<FavoriteResult>;
  getFavoriteByProduct: (productId: string) => Promise<FavoriteResult>;

  // Local helper (no network)
  isFavoritedLocal: (productId: string) => boolean;
}
export const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  loading: true,
  error: null,
  fetchUserFavorites: async () => {},
  addFavorite: async () => ({ success: false, error: "Not implemented" }),
  removeFavorite: async () => ({ success: false, error: "Not implemented" }),
  toggleFavorite: async () => ({ success: false, error: "Not implemented" }),
  getFavoriteByProduct: async () => ({
    success: false,
    error: "Not implemented",
  }),
  isFavoritedLocal: () => false,
});

export const FavoriteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  /** Helper — check if a product is already favorited locally */
  const isFavoritedLocal = (productId: string) =>
    favorites.some((f) => f.productId === productId);

  /** Fetch all favorites for the current user */
  const fetchUserFavorites = async (signal?: AbortSignal) => {
    setLoading(true);
    try {
      const response = await getUserFavoritesApi({ signal });
      if (response.success && Array.isArray(response.data)) {
        setFavorites(response.data);
        setError(null);
      } else {
        setError(response.error || "Failed to fetch favorites");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch favorites";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (productId: string): Promise<FavoriteResult> => {
    try {
      const response = await addFavoriteApi(productId);
      if (response.success && response.data) {
        const newFavorite = response.data as Favorite;
        // Update local state only if not already present
        setFavorites((prev) => {
          // prev is the previous favorites array
          if (isFavoritedLocal(newFavorite.productId)) return prev; // avoid duplicates by checking existing favorites
          return [...prev, newFavorite]; // add new favorite
        });

        toast.success("Added to favorites");
        return { success: true, data: response.data };
      }
      return {
        success: false,
        error: response.error || "Failed to add favorite",
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to add favorite";
      return { success: false, error: message };
    }
  };

  const removeFavorite = async (
    favoriteId: string
  ): Promise<FavoriteResult> => {
    setLoading(true);
    try {
      const response = await removeFavoriteApi(favoriteId);
      if (response.success) {
        // Update local state to remove the favorite
        setFavorites((prev) =>
          prev.filter((fav) => fav.productId !== favoriteId)
        ); // remove from local state by filtering out the removed favorite
        toast.success("Removed from favorites");
        return { success: true, data: [] };
      }
      return {
        success: false,
        error: response.error || "Failed to remove favorite",
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to remove favorite";
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  /** Toggle a product's favorite status */
  const toggleFavorite = async (productId: string): Promise<FavoriteResult> => {
    try {
      const response = await toggleFavoriteApi(productId);
      if (response.success && response.data) {
        const { toggled, data } = response.data as {
          toggled: string;
          data: Favorite;
        };
        if (toggled === "added") {
          setFavorites((prev) => [...prev, data]);
          toast.success("Added to favorites");
        } else {
          setFavorites((prev) =>
            prev.filter((fav) => fav.productId !== productId)
          );
          toast.success("Removed from favorites");
        }

        return { success: true, data: [] };
      }
      return {
        success: false,
        error: response.error || "Failed to toggle favorite",
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to toggle favorite";
      return { success: false, error: message };
    }
  };

  const getFavoriteByProduct = async (
    productId: string
  ): Promise<FavoriteResult> => {
    try {
      const response = await getFavoriteByProductApi(productId);
      if (response.success && response.data) {
        return { success: true, data: response.data };
      }
      return {
        success: false,
        error: response.error || "Favorite not found for product",
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to fetch favorite by product";
      return { success: false, error: message };
    }
  };

  // Initialize AbortController on mount to avoid memory leaks
  useEffect(() => {
    // Create a new controller
    const controller = new AbortController();
    // Store it in ref for cleanup on unmount
    abortRef.current = controller;

    // Fetch on mount
    fetchUserFavorites(abortRef.current.signal);

    // Cleanup on unmount
    return () => abortRef.current?.abort();
  }, []);

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        loading,
        error,
        fetchUserFavorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        getFavoriteByProduct,
        isFavoritedLocal,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);
