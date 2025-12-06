# Order Flow UI Components - Architecture Guide

## Overview

A fully reusable, modular, scalable Order Flow UI system for Checkout and Order pages.

## Design Principles

✅ **Single Responsibility** - Each component handles one concern  
✅ **Controlled Components** - No internal data fetching; all data via props  
✅ **Composition** - Build complex UIs from simple pieces  
✅ **Type Safety** - Full TypeScript support with proper interfaces  
✅ **Accessibility** - ARIA labels, keyboard navigation, focus management  
✅ **Responsive** - Mobile-first design with desktop enhancements

---

## Component Inventory

### 🛒 Core Components

#### `OrderItemList`

**Purpose:** Display order/cart items with optional editing capabilities

**Props:**

```typescript
interface OrderItemListProps {
  items: OrderItem[]; // Required: items to display
  editable?: boolean; // Show quantity controls
  showRemove?: boolean; // Show remove button
  onQuantityChange?: (itemId: string, quantity: number) => void;
  onRemove?: (itemId: string) => void;
  loading?: boolean;
  className?: string;
}
```

**Usage:**

```tsx
// Read-only (Order Details)
<OrderItemList items={order.orderItems} />

// Editable (Cart/Checkout)
<OrderItemList
  items={cartItems}
  editable
  showRemove
  onQuantityChange={handleQtyChange}
  onRemove={handleRemove}
  loading={isUpdating}
/>
```

**Features:**

- ✅ Responsive grid layout
- ✅ Next.js Image optimization
- ✅ Empty state handling
- ✅ Skeleton loader (`OrderItemListSkeleton`)

---

#### `OrderSummary`

**Purpose:** Display price breakdown (subtotal, tax, shipping, discount, total)

**Props:**

```typescript
interface OrderSummaryProps {
  order?: Order; // Pass full order object OR...
  subtotal?: string | number; // ...individual values
  tax?: string | number;
  discount?: string | number;
  shippingFee?: string | number;
  total?: string | number;
  className?: string;
}
```

**Usage:**

```tsx
// With order object
<OrderSummary order={order} />

// With individual values (Checkout)
<OrderSummary
  subtotal={cartSubtotal}
  tax={calculatedTax}
  shippingFee={shippingCost}
  total={finalTotal}
/>
```

---

#### `OrderReview`

**Purpose:** Comprehensive review screen combining items, address, payment, and summary

**Props:**

```typescript
interface OrderReviewProps {
  order?: Order; // Full order OR...
  items?: OrderItem[]; // ...individual props
  shippingAddress?: ShippingAddress | null;
  payment?: Payment | null;
  subtotal?: string | number;
  tax?: string | number;
  discount?: string | number;
  shippingFee?: string | number;
  total?: string | number;
  className?: string;
}
```

**Usage:**

```tsx
// Checkout review step
<OrderReview
  items={cartItems}
  shippingAddress={selectedAddress}
  payment={paymentMethod}
  subtotal={subtotal}
  tax={tax}
  shippingFee={shipping}
  total={total}
/>

// Order confirmation page
<OrderReview order={createdOrder} />
```

---

### 📍 Address Components

#### `AddressForm`

**Purpose:** Reusable form for creating/editing shipping addresses

**Props:**

```typescript
interface AddressFormProps {
  initialData?: Partial<ShippingAddressInput>;
  onSubmit: (address: ShippingAddressInput) => void | Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  loading?: boolean;
  className?: string;
}
```

**Usage:**

```tsx
// Create new address (Checkout)
<AddressForm
  onSubmit={async (data) => {
    await createShippingAddress(orderId, data);
    goToNextStep();
  }}
  submitLabel="Continue to Shipping"
/>

// Edit existing address
<AddressForm
  initialData={existingAddress}
  onSubmit={handleUpdate}
  onCancel={handleCancel}
  submitLabel="Save Address"
  loading={isUpdating}
/>
```

**Features:**

- ✅ Controlled inputs with state management
- ✅ Validation (HTML5 required)
- ✅ Loading states
- ✅ Responsive grid layout

---

#### `ShippingAddressCard`

**Purpose:** Read-only display of shipping address

**Props:**

```typescript
{
  address: ShippingAddress | null | undefined;
}
```

**Usage:**

```tsx
<ShippingAddressCard address={order.shippingAddress} />
```

---

### 💳 Payment Components

#### `PaymentMethodSelector`

**Purpose:** Select payment method from available options

**Props:**

```typescript
interface PaymentMethodSelectorProps {
  value?: string; // Selected method ID
  onChange: (methodId: string) => void;
  methods?: PaymentMethod[]; // Custom methods (optional)
  disabled?: boolean;
  className?: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
  enabled?: boolean;
}
```

**Default methods:** COD, CARD, ESEWA, KHALTI

**Usage:**

```tsx
<PaymentMethodSelector
  value={selectedPayment}
  onChange={setSelectedPayment}
/>

// Custom methods
<PaymentMethodSelector
  value={selected}
  onChange={setSelected}
  methods={[
    { id: 'COD', name: 'Cash on Delivery', enabled: true },
    { id: 'STRIPE', name: 'Credit Card', enabled: false },
  ]}
/>
```

**Features:**

- ✅ Radio button UI with visual feedback
- ✅ Hover/focus states
- ✅ Icon support
- ✅ Disabled state handling

---

#### `PaymentInfoCard`

**Purpose:** Display payment details (provider, amount, transaction ID, status)

**Props:**

```typescript
{
  payment: Payment | null | undefined;
}
```

**Usage:**

```tsx
<PaymentInfoCard payment={order.payment} />
```

---

#### `PaymentStatusBadge`

**Purpose:** Visual badge for payment status

**Props:**

```typescript
{
  status: PaymentStatus;
}
```

**Statuses:** PENDING, PAID, FAILED, REFUNDED

**Usage:**

```tsx
<PaymentStatusBadge status={payment.status} />
```

---

### 📊 Status & Timeline Components

#### `OrderStatusBadge`

**Purpose:** Visual badge for order status

**Props:**

```typescript
{
  status: OrderStatus;
}
```

**Statuses:** PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELED

**Usage:**

```tsx
<OrderStatusBadge status={order.status} />
```

---

#### `OrderTrackingTimeline`

**Purpose:** Visual progress indicator for order fulfillment

**Props:**

```typescript
interface OrderTrackingTimelineProps {
  status: OrderStatus;
  className?: string;
}
```

**Usage:**

```tsx
<OrderTrackingTimeline status={order.status} />
```

**Features:**

- ✅ Progressive disclosure (PENDING → PROCESSING → SHIPPED → DELIVERED)
- ✅ Special handling for CANCELED status
- ✅ Icons and progress bar
- ✅ Active step highlighting

---

### 🎯 Checkout-Specific Components

#### `CheckoutStepper`

**Purpose:** Multi-step progress indicator for checkout flow

**Props:**

```typescript
interface CheckoutStepperProps {
  currentStep: number; // 1-based index
  steps?: string[]; // Default: ["Address", "Payment", "Review"]
}
```

**Usage:**

```tsx
<CheckoutStepper
  currentStep={currentStep}
  steps={["Address", "Shipping", "Payment", "Review"]}
/>
```

**Features:**

- ✅ Visual progress bar
- ✅ Checkmarks for completed steps
- ✅ Active step highlighting

---

#### `CheckoutPaymentMethod`

**Purpose:** Payment method selection integrated with OrderContext

**Props:**

```typescript
interface Props {
  onNext: () => void;
  onBack: () => void;
}
```

**Usage:**

```tsx
<CheckoutPaymentMethod onNext={() => setStep(3)} onBack={() => setStep(1)} />
```

**Note:** This wraps `PaymentMethodSelector` with OrderContext integration. For context-free usage, use `PaymentMethodSelector` directly.

---

#### `OrderSuccess`

**Purpose:** Success confirmation screen after order placement

**Props:**

```typescript
{
  orderId: string;
}
```

**Usage:**

```tsx
<OrderSuccess orderId={createdOrder.id} />
```

---

## Composition Patterns

### Pattern 1: Checkout Flow (Multi-Step)

```tsx
"use client";

import { useState } from "react";
import {
  CheckoutStepper,
  AddressForm,
  PaymentMethodSelector,
  OrderReview,
  OrderSuccess,
} from "@/components/order";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(null);
  const [payment, setPayment] = useState(null);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <CheckoutStepper
        currentStep={step}
        steps={["Address", "Payment", "Review"]}
      />

      {step === 1 && (
        <AddressForm
          onSubmit={(data) => {
            setAddress(data);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <div>
          <PaymentMethodSelector value={payment} onChange={setPayment} />
          <Button onClick={() => setStep(3)}>Continue</Button>
        </div>
      )}

      {step === 3 && (
        <OrderReview
          items={cartItems}
          shippingAddress={address}
          payment={payment}
          onConfirm={handlePlaceOrder}
        />
      )}

      {step === 4 && <OrderSuccess orderId={orderId} />}
    </div>
  );
}
```

---

### Pattern 2: Order Details Page (Read-Only)

```tsx
"use client";

import {
  OrderStatusBadge,
  OrderItemList,
  ShippingAddressCard,
  PaymentInfoCard,
  OrderSummary,
  OrderTrackingTimeline,
} from "@/components/order";

export default function OrderDetailsPage({ order }) {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
          <p className="text-muted-foreground">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Timeline */}
      <OrderTrackingTimeline status={order.status} />

      {/* Items */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Items</h2>
        <OrderItemList items={order.orderItems} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Address & Payment */}
        <ShippingAddressCard address={order.shippingAddress} />
        <PaymentInfoCard payment={order.payment} />
      </div>

      {/* Summary */}
      <OrderSummary order={order} />
    </div>
  );
}
```

---

### Pattern 3: Cart Page (Editable Items)

```tsx
"use client";

import { useCart } from "@/context/CartContext";
import { OrderItemList, OrderSummary } from "@/components/order";
import { Button } from "@/components/ui";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, total } = useCart();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OrderItemList
            items={items}
            editable
            showRemove
            onQuantityChange={updateQuantity}
            onRemove={removeItem}
          />
        </div>

        <div>
          <OrderSummary
            subtotal={subtotal}
            tax={0}
            shippingFee={0}
            total={total}
          />
          <Button className="w-full mt-4" href="/checkout">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
```

---

## State Management Strategy

### Option 1: Context-Based (Current)

Use existing `OrderContext` for checkout flows:

```tsx
const { currentOrder, createShippingAddress, createPayment } = useOrder();
```

### Option 2: URL-State Sync (Recommended for Checkout)

Persist step and selections in URL for:

- ✅ Shareable links
- ✅ Browser back/forward support
- ✅ Page refresh resilience

```tsx
const searchParams = useSearchParams();
const step = Number(searchParams.get("step")) || 1;
```

### Option 3: Local Storage Backup

Persist form data to prevent loss on accidental navigation:

```tsx
useEffect(() => {
  localStorage.setItem("checkout_draft", JSON.stringify({ address, payment }));
}, [address, payment]);
```

---

## Testing Strategy

### Unit Tests

```bash
# Test individual components
npm test OrderItemList
npm test PaymentMethodSelector
npm test AddressForm
```

### Integration Tests

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutFlow from "./CheckoutFlow";

test("completes checkout flow", async () => {
  render(<CheckoutFlow />);

  // Step 1: Address
  fireEvent.change(screen.getByLabelText("Full Name"), {
    target: { value: "John Doe" },
  });
  fireEvent.click(screen.getByText("Continue"));

  // Step 2: Payment
  fireEvent.click(screen.getByText("Cash on Delivery"));
  fireEvent.click(screen.getByText("Continue"));

  // Step 3: Review & Place Order
  expect(screen.getByText("Review Your Order")).toBeInTheDocument();
});
```

---

## Migration Path

### Phase 1: Adopt in Order Pages (Low Risk)

Replace read-only components first:

```tsx
// Old
<div>{order.items.map(...)}</div>

// New
<OrderItemList items={order.orderItems} />
```

### Phase 2: Refactor Checkout (Medium Risk)

Replace checkout steps incrementally:

1. Address step → `AddressForm`
2. Payment step → `PaymentMethodSelector`
3. Review step → `OrderReview`

### Phase 3: Consolidate Contexts (High Risk)

- Deprecate duplicate logic in `OrderContext`, `CartContext`, `PaymentContext`
- Centralize price calculations in hooks/services

---

## Performance Optimizations

### Image Optimization

```tsx
// ✅ Uses Next.js Image with automatic optimization
<Image src={item.productImage} alt={item.productName} fill />
```

### Code Splitting

```tsx
// Lazy load heavy components
const OrderTrackingTimeline = dynamic(
  () => import("@/components/order/OrderTrackingTimeline")
);
```

### Memoization

```tsx
const MemoizedOrderItemList = memo(OrderItemList);
```

---

## Accessibility Checklist

- ✅ All form inputs have labels
- ✅ Buttons have aria-labels
- ✅ Keyboard navigation (Tab, Enter, Space)
- ✅ Focus management on step transitions
- ✅ Error messages linked with aria-describedby
- ✅ Color contrast ratios meet WCAG AA
- ✅ Screen reader announcements for status changes

---

## Next Steps

1. **Implement data hooks** (`useShippingMethods`, `usePriceQuote`)
2. **Add Storybook stories** for visual testing
3. **Create E2E tests** (Playwright/Cypress)
4. **Document API contracts** for backend endpoints
5. **Add analytics hooks** (track step views, conversions)
6. **Implement feature flags** for A/B testing payment methods

---

## Import Examples

```tsx
// Named imports
import {
  OrderItemList,
  OrderSummary,
  PaymentMethodSelector,
} from "@/components/order";

// Individual imports
import OrderItemList from "@/components/order/OrderItemList";
import { OrderItemListSkeleton } from "@/components/order/OrderItemList";
```

---

## File Structure

```
frontend/src/components/order/
├── index.ts                      # Barrel export
├── OrderItemList.tsx             # ✅ Items display (editable)
├── OrderSummary.tsx              # ✅ Price breakdown
├── OrderReview.tsx               # ✅ Full review composite
├── OrderStatusBadge.tsx          # ✅ Status badge
├── OrderTrackingTimeline.tsx     # ✅ Progress timeline
├── OrderSuccess.tsx              # ✅ Success screen
├── OrderInvoiceSummary.tsx       # Price breakdown (alias)
├── AddressForm.tsx               # ✅ Address input form
├── ShippingAddressCard.tsx       # ✅ Address display
├── PaymentMethodSelector.tsx     # ✅ Payment selection
├── PaymentInfoCard.tsx           # ✅ Payment details
├── PaymentStatusBadge.tsx        # ✅ Payment status
├── CheckoutStepper.tsx           # ✅ Step progress
└── CheckoutPaymentMethod.tsx     # Context-integrated payment
```

---

## Summary

✅ **14 reusable components** covering all order flow needs  
✅ **Fully typed** with TypeScript interfaces  
✅ **Accessible** with ARIA support  
✅ **Responsive** mobile-first design  
✅ **Testable** with clear prop contracts  
✅ **Composable** for checkout, cart, and order pages  
✅ **Production-ready** with error handling and loading states

Start using immediately with minimal changes to existing code!
