"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

import type {
  Order,
  ShippingAddress,
  ShippingAddressInput,
  Payment,
  PaymentInput,
  PaymentStatus,
} from "@/lib/types";

import {
  getUserOrders,
  getOrderById,
  createOrder as apiCreateOrder,
  cancelOrder as apiCancelOrder,
  type CreateOrderPayload,
  createShippingAddress as apiCreateShippingAddress,
  updateShippingAddress as apiUpdateShippingAddress,
  getShippingAddress as apiGetShippingAddress,
  deleteShippingAddress as apiDeleteShippingAddress,
  createPayment as apiCreatePayment,
  updatePaymentStatus as apiUpdatePaymentStatus,
  getPaymentByOrder as apiGetPaymentByOrder,
  refundPayment as apiRefundPayment,
} from "@/lib/api/product/order";

// =====================================================
// TYPES
// =====================================================
interface OrderContextValue {
  // State
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;

  // Order operations
  fetchUserOrders: () => Promise<void>;
  fetchOrderById: (orderId: string) => Promise<Order | null>;
  createOrder: (payload: CreateOrderPayload) => Promise<Order | null>;
  cancelOrder: (orderId: string) => Promise<Order | null>;
  clearError: () => void;

  // Shipping address operations
  createShippingAddress: (
    orderId: string,
    data: ShippingAddressInput
  ) => Promise<ShippingAddress | null>;
  updateShippingAddress: (
    orderId: string,
    data: ShippingAddressInput
  ) => Promise<ShippingAddress | null>;
  getShippingAddress: (orderId: string) => Promise<ShippingAddress | null>;
  deleteShippingAddress: (orderId: string) => Promise<boolean>;

  // Payment operations
  createPayment: (
    orderId: string,
    data: PaymentInput
  ) => Promise<Payment | null>;
  updatePaymentStatus: (
    orderId: string,
    status: PaymentStatus,
    transactionId?: string
  ) => Promise<Payment | null>;
  getPaymentByOrder: (orderId: string) => Promise<Payment | null>;
  refundPayment: (orderId: string) => Promise<Payment | null>;
}

// =====================================================
// CONTEXT
// =====================================================
const OrderContext = createContext<OrderContextValue | undefined>(undefined);

// =====================================================
// PROVIDER
// =====================================================
export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to extract data and handle errors
  const extractData = <T,>(response: { data?: T } | undefined): T | null => {
    return response?.data ?? null;
  };

  const extractNestedData = <T,>(
    response: { data?: { data?: T } } | undefined
  ): T | null => {
    return response?.data?.data ?? null;
  };

  const handleError = useCallback((err: unknown, fallback: string): void => {
    const message = err instanceof Error ? err.message : fallback;
    setError(message);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Update order in local state
  const updateOrderInState = useCallback(
    (orderId: string, updates: Partial<Order>) => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, ...updates } : order
        )
      );
    },
    []
  );

  // =====================================================
  // ORDER OPERATIONS
  // =====================================================
  const fetchUserOrders = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUserOrders();
      setOrders(extractData(response) ?? []);
    } catch (err) {
      handleError(err, "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const fetchOrderById = useCallback(
    async (orderId: string): Promise<Order | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await getOrderById(orderId);
        const order = extractData(response);
        setCurrentOrder(order);
        return order;
      } catch (err) {
        handleError(err, "Failed to fetch order");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const createOrder = useCallback(
    async (payload: CreateOrderPayload): Promise<Order | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiCreateOrder(payload);
        const order = extractData(response);
        if (order) {
          setOrders((prev) => [order, ...prev]);
          setCurrentOrder(order);
        }
        return order;
      } catch (err) {
        handleError(err, "Failed to create order");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const cancelOrder = useCallback(
    async (orderId: string): Promise<Order | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiCancelOrder(orderId);
        const canceledOrder = extractData(response);
        if (canceledOrder) {
          updateOrderInState(orderId, canceledOrder);
          if (currentOrder?.id === orderId) {
            setCurrentOrder(canceledOrder);
          }
        }
        return canceledOrder;
      } catch (err) {
        handleError(err, "Failed to cancel order");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [handleError, updateOrderInState, currentOrder]
  );

  // =====================================================
  // SHIPPING ADDRESS OPERATIONS
  // =====================================================
  const createShippingAddress = useCallback(
    async (
      orderId: string,
      data: ShippingAddressInput
    ): Promise<ShippingAddress | null> => {
      setError(null);
      try {
        const response = await apiCreateShippingAddress(orderId, data);
        const address = extractNestedData(response);
        if (address) {
          updateOrderInState(orderId, { shippingAddress: address });
        }
        return address;
      } catch (err) {
        handleError(err, "Failed to create shipping address");
        return null;
      }
    },
    [handleError, updateOrderInState]
  );

  const updateShippingAddress = useCallback(
    async (
      orderId: string,
      data: ShippingAddressInput
    ): Promise<ShippingAddress | null> => {
      setError(null);
      try {
        const response = await apiUpdateShippingAddress(orderId, data);
        const address = extractNestedData(response);
        if (address) {
          updateOrderInState(orderId, { shippingAddress: address });
        }
        return address;
      } catch (err) {
        handleError(err, "Failed to update shipping address");
        return null;
      }
    },
    [handleError, updateOrderInState]
  );

  const getShippingAddress = useCallback(
    async (orderId: string): Promise<ShippingAddress | null> => {
      try {
        const response = await apiGetShippingAddress(orderId);
        return extractNestedData(response);
      } catch (err) {
        handleError(err, "Failed to load shipping address");
        return null;
      }
    },
    [handleError]
  );

  const deleteShippingAddress = useCallback(
    async (orderId: string): Promise<boolean> => {
      try {
        await apiDeleteShippingAddress(orderId);
        updateOrderInState(orderId, { shippingAddress: null });
        return true;
      } catch (err) {
        handleError(err, "Failed to delete shipping address");
        return false;
      }
    },
    [handleError, updateOrderInState]
  );

  // =====================================================
  // PAYMENT OPERATIONS
  // =====================================================
  const createPayment = useCallback(
    async (orderId: string, data: PaymentInput): Promise<Payment | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiCreatePayment(orderId, data);
        const payment = extractData(response);
        if (payment) {
          updateOrderInState(orderId, { payment });
        }
        return payment;
      } catch (err) {
        handleError(err, "Failed to create payment");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [handleError, updateOrderInState]
  );

  const updatePaymentStatus = useCallback(
    async (
      orderId: string,
      status: PaymentStatus,
      transactionId?: string
    ): Promise<Payment | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiUpdatePaymentStatus(
          orderId,
          status,
          transactionId
        );
        const payment = extractData(response);
        if (payment) {
          updateOrderInState(orderId, { payment });
        }
        return payment;
      } catch (err) {
        handleError(err, "Failed to update payment status");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [handleError, updateOrderInState]
  );

  const getPaymentByOrder = useCallback(
    async (orderId: string): Promise<Payment | null> => {
      try {
        const response = await apiGetPaymentByOrder(orderId);
        return extractData(response);
      } catch (err) {
        handleError(err, "Failed to load payment");
        return null;
      }
    },
    [handleError]
  );

  const refundPayment = useCallback(
    async (orderId: string): Promise<Payment | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiRefundPayment(orderId);
        const payment = extractData(response);
        if (payment) {
          updateOrderInState(orderId, { payment });
        }
        return payment;
      } catch (err) {
        handleError(err, "Failed to refund payment");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [handleError, updateOrderInState]
  );

  // Auto-fetch orders on mount
  useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);

  // =====================================================
  // CONTEXT VALUE
  // =====================================================
  const value: OrderContextValue = {
    // State
    orders,
    currentOrder,
    loading,
    error,

    // Order operations
    fetchUserOrders,
    fetchOrderById,
    createOrder,
    cancelOrder,
    clearError,

    // Shipping address operations
    createShippingAddress,
    updateShippingAddress,
    getShippingAddress,
    deleteShippingAddress,

    // Payment operations
    createPayment,
    updatePaymentStatus,
    getPaymentByOrder,
    refundPayment,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

// =====================================================
// HOOK
// =====================================================
export function useOrder(): OrderContextValue {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within OrderProvider");
  }
  return context;
}
