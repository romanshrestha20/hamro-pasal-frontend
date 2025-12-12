"use client";

import { useEffect, useState } from "react";

import { Button, Input } from "@/components/ui/index";
import type { ShippingAddressInput } from "@/lib/types";

interface AddressFormProps {
  initialData?: Partial<ShippingAddressInput>;
  onSubmit: (address: ShippingAddressInput) => void | Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  loading?: boolean;
  className?: string;
}

export default function AddressForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Continue",
  loading = false,
  className = "",
}: AddressFormProps) {
  const [formData, setFormData] = useState<Partial<ShippingAddressInput>>({
    fullName: initialData?.fullName ?? "",
    phone: initialData?.phone ?? "",
    address: initialData?.address ?? "",
    city: initialData?.city ?? "",
    postalCode: initialData?.postalCode ?? "",
    country: initialData?.country ?? "Nepal",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(formData as ShippingAddressInput);
  };

  const handleChange = (field: keyof ShippingAddressInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (!initialData) return;

    setFormData((prev) => ({
      ...prev,
         // only fill empty fields (NEVER override user input)
      fullName: initialData.fullName ?? "",
      phone: initialData.phone ?? "",
      address: initialData.address ?? "",
      city: initialData.city ?? "",
      postalCode: initialData.postalCode ?? "",
      country: initialData.country ?? "Nepal",
    }));
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          placeholder="John Doe"
          required
          disabled={loading}
        />
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="+977 9801234567"
          required
          disabled={loading}
        />
      </div>

      <Input
        label="Address"
        name="address"
        value={formData.address}
        onChange={(e) => handleChange("address", e.target.value)}
        placeholder="Street address, apartment, suite, etc."
        required
        disabled={loading}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={(e) => handleChange("city", e.target.value)}
          placeholder="Kathmandu"
          required
          disabled={loading}
        />
        <Input
          label="Postal Code"
          name="postalCode"
          value={formData.postalCode}
          onChange={(e) => handleChange("postalCode", e.target.value)}
          placeholder="44600"
          required
          disabled={loading}
        />
      </div>

      <Input
        label="Country"
        name="country"
        value={formData.country}
        onChange={(e) => handleChange("country", e.target.value)}
        placeholder="Nepal"
        required
        disabled={loading}
      />

      <div className="flex gap-3 pt-4">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
            className="flex-1"
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? "Submitting..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
