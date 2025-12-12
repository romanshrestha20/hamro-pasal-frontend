"use client";

import { useState } from "react";
import { useOrder } from "@/context/OrderContext";
import { useUser } from "@/hooks/useUser";
import type { ShippingAddressInput } from "@/lib/types";
import AddressForm from "./AddressForm";

interface CheckoutAddressFormProps {
  onNext: () => void;
}

export default function CheckoutAddressForm({
  onNext,
}: CheckoutAddressFormProps) {
  const {
    createShippingAddress,
    currentOrder,
    loading: orderLoading,
  } = useOrder();

  const { user, isAuthenticated } = useUser();
  const [useProfileAddress, setUseProfileAddress] = useState(false);
//   const orderReady = Boolean(currentOrder);

  const handleSubmit = async (addressData: ShippingAddressInput) => {
    if (!currentOrder) return; // guard: button will be disabled until ready

    await createShippingAddress(currentOrder.id, addressData);
    onNext();
  };

  // Auto-fill initial data from user profile if checkbox is checked
  const getInitialData = (): Partial<ShippingAddressInput> | undefined => {
    if (!useProfileAddress || !user) return undefined;

    return {
      fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      phone: user.phone || "",
      address: user.address || "",
      city: "",
      postalCode: "",
      country: "Nepal",
    };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Shipping Address</h2>
        <p className="mt-1 text-muted-foreground">
          Where should we deliver your order?
        </p>
      </div>

      {isAuthenticated && user && (
        <label className="flex items-center gap-3 p-4 transition-colors border rounded-lg cursor-pointer hover:bg-accent/50">
          <input
            type="checkbox"
            checked={useProfileAddress}
            onChange={(e) => setUseProfileAddress(e.target.checked)}
            className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary"
          />
          <div className="flex-1">
            <p className="text-sm font-medium">Use my profile information</p>
            <p className="text-xs text-muted-foreground">
              Auto-fill name and phone from your profile
            </p>
          </div>
        </label>
      )}

      <AddressForm
        key={useProfileAddress ? "profile": "manual"}
        initialData={getInitialData()}
        onSubmit={handleSubmit}
        submitLabel="Continue to Payment"
        loading={orderLoading}
      />
    </div>
  );
}
