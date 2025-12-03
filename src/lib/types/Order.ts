export type OrderStatus =
    | "PENDING"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELED";

export type PaymentStatus =
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED";


export interface ShippingAddressInput {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

export interface ShippingAddress extends ShippingAddressInput {
    id: string;
    orderId: string;
    createdAt?: string;
    updatedAt?: string;
}
export interface PaymentInput {
    provider?: string;       // STRIPE, ESEWA, KHALTI, COD
    method?: string;         // optional alias
    transactionId?: string;  // gateway transactionId
}
export interface Payment {
    id: string;
    orderId: string;
    amount: string; // decimal as string
    provider?: string;
    transactionId?: string | null;
    status: PaymentStatus;
    createdAt?: string;
}

export interface Order {
    id: string;
    userId: string;

    status: OrderStatus;

    subtotal: string;
    tax: string;
    discount: string;
    shippingFee: string;
    total: string;

    createdAt?: string;
    updatedAt?: string;

    orderItems: OrderItem[];

    payment?: Payment | null;

    shippingAddress?: ShippingAddress | null;
}


export interface OrderItem {
    id: string;
    productId: string;
    quantity: number;

    // pricing snapshots
    unitPrice: string;  // decimal as string
    discount: string;
    tax: string;
    subtotal: string;

    // product snapshot
    productName: string;
    productImage?: string | null;

    // variant support (optional)
    sku?: string;
    variantId?: string;
    variantName?: string;

    // status per item line
    status: string;

    createdAt?: string;
    updatedAt?: string;
}
