import { apiRequest } from "@/lib/api";
import type { PaymentStatus, Payment, ShippingAddress } from "@/lib/types";


// Request options type for optional signal and params
type RequestOptions = { signal?: AbortSignal; params?: Record<string, unknown> };


// Helper to extract config from options if provided
const withConfig = (options?: RequestOptions) =>
    options ? { signal: options.signal, params: options.params } : undefined;

/**
 * Create a payment for an order
 */
export const createPayment = (
    paymentData: Partial<Payment>,
    options?: RequestOptions
) => apiRequest<Payment>("post", `/orders/:orderId/payments`, paymentData, withConfig(options));


/**
 * Get payment by order ID
 */
export const getPaymentByOrderId = (orderId: string, options?: RequestOptions) =>
    apiRequest<Payment>("get", `/orders/${orderId}/payments`, undefined, withConfig(options));

/**
 * Update payment status
 */
export const updatePaymentStatus = (
    paymentId: string,
    status: PaymentStatus,
    options?: RequestOptions
) => apiRequest<Payment>("patch", `/orders/:orderId/payment/status`, { status }, withConfig(options));

/**
 * Refund a payment
 */
export const refundPayment = (
    paymentId: string,
    options?: RequestOptions
) => apiRequest<Payment>("post", `/orders/:orderId/payment/refund`, undefined, withConfig(options));



