import { apiRequest } from "@/lib/api";
import type { ShippingAddress } from "@/lib/types";


// Request options type for optional signal and params
type RequestOptions = { signal?: AbortSignal; params?: Record<string, unknown> };


// Helper to extract config from options if provided
const withConfig = (options?: RequestOptions) =>
    options ? { signal: options.signal, params: options.params } : undefined;


// // Shipping Address
// router.post("/:orderId/address", authEither, createShippingAddress);
// router.patch("/:orderId/address", authEither, updateShippingAddress);
// router.get("/:orderId/address", authEither, getShippingAddress);
// router.delete("/:orderId/address", authEither, deleteShippingAddress);


export const createShippingAddress = (
    orderId: string,
    addressData: Partial<ShippingAddress>,
    options?: RequestOptions
) => apiRequest<ShippingAddress>("post", `/orders/${orderId}/address`, addressData, withConfig(options));

export const updateShippingAddress = (
    orderId: string,
    addressData: Partial<ShippingAddress>,
    options?: RequestOptions
) => apiRequest<ShippingAddress>("patch", `/orders/${orderId}/address`, addressData, withConfig(options));

export const getShippingAddress = (
    orderId: string,
    options?: RequestOptions
) => apiRequest<ShippingAddress>("get", `/orders/${orderId}/address`, undefined, withConfig(options));

export const deleteShippingAddress = (
    orderId: string,
    options?: RequestOptions
) => apiRequest<void>("delete", `/orders/${orderId}/address`, undefined, withConfig(options));