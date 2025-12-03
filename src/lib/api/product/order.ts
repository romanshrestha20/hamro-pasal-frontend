import { apiRequest } from "@/lib/api";
import type {
  Order,
  ShippingAddressInput,
  ShippingAddress,
  Payment,
  PaymentInput,
  OrderStatus,
  PaymentStatus,
} from "@/lib/types";

type RequestOptions = {
  signal?: AbortSignal;
  params?: Record<string, unknown>;
};

const withConfig = (options?: RequestOptions) =>
  options ? { signal: options.signal, params: options.params } : undefined;

/* ===========================================================
   USER ORDERS
=========================================================== */
export const getUserOrders = (options?: RequestOptions) =>
  apiRequest<Order[]>("get", `/orders/my`, undefined, withConfig(options));

export const getOrderById = (orderId: string, options?: RequestOptions) =>
  apiRequest<Order>("get", `/orders/${orderId}`, undefined, withConfig(options));

/* ===========================================================
   CREATE ORDER
=========================================================== */
export interface CreateOrderPayload {
  items: Array<{ productId: string; quantity: number }>;
  shippingAddress?: ShippingAddressInput;
  paymentMethod?: string;
  paymentProvider?: string;
}

export const createOrder = (
  payload: CreateOrderPayload,
  options?: RequestOptions
) =>
  apiRequest<Order>("post", `/orders`, payload, withConfig(options));

/* ===========================================================
   ORDER STATUS
=========================================================== */
export const updateOrderStatus = (
  orderId: string,
  status: OrderStatus,
  options?: RequestOptions
) =>
  apiRequest<Order>(
    "patch",
    `/orders/${orderId}/status`,
    { status },
    withConfig(options)
  );

export const cancelOrder = (orderId: string, options?: RequestOptions) =>
  apiRequest<Order>(
    "patch",
    `/orders/${orderId}/cancel`,
    undefined,
    withConfig(options)
  );

/* ===========================================================
   SHIPPING ADDRESS
=========================================================== */
export const createShippingAddress = (
  orderId: string,
  data: ShippingAddressInput,
  options?: RequestOptions
) =>
  apiRequest<{ success: true; data: ShippingAddress }>(
    "post",
    `/orders/${orderId}/address`,
    data,
    withConfig(options)
  );

export const updateShippingAddress = (
  orderId: string,
  data: ShippingAddressInput,
  options?: RequestOptions
) =>
  apiRequest<{ success: true; data: ShippingAddress }>(
    "patch",
    `/orders/${orderId}/address`,
    data,
    withConfig(options)
  );

export const getShippingAddress = (
  orderId: string,
  options?: RequestOptions
) =>
  apiRequest<{ success: true; data: ShippingAddress }>(
    "get",
    `/orders/${orderId}/address`,
    undefined,
    withConfig(options)
  );

export const deleteShippingAddress = (
  orderId: string,
  options?: RequestOptions
) =>
  apiRequest<{ success: true; message: string }>(
    "delete",
    `/orders/${orderId}/address`,
    undefined,
    withConfig(options)
  );

/* ===========================================================
   PAYMENT
=========================================================== */
export const createPayment = (
  orderId: string,
  data: PaymentInput,
  options?: RequestOptions
) =>
  apiRequest<Payment>(
    "post",
    `/orders/${orderId}/payment`,
    data,
    withConfig(options)
  );

export const updatePaymentStatus = (
  orderId: string,
  status: PaymentStatus,
  transactionId?: string,
  options?: RequestOptions
) =>
  apiRequest<Payment>(
    "patch",
    `/orders/${orderId}/payment/status`,
    { status, transactionId },
    withConfig(options)
  );

export const getPaymentByOrder = (
  orderId: string,
  options?: RequestOptions
) =>
  apiRequest<Payment>(
    "get",
    `/orders/${orderId}/payment`,
    undefined,
    withConfig(options)
  );

export const refundPayment = (orderId: string, options?: RequestOptions) =>
  apiRequest<Payment>(
    "patch",
    `/orders/${orderId}/payment/refund`,
    undefined,
    withConfig(options)
  );
