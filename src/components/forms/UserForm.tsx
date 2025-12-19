"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import toast from "react-hot-toast";
import LoadingState from "../common/LoadingState";
import { Form } from "../ui";
import { useFormValidation } from "@/hooks/useFormValidation";
import { validationRules } from "@/lib/validation/formSchema";

interface UserFormProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  phone?: string;
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
  }) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

export default function UserForm({
  firstName = "",
  lastName = "",
  email = "",
  address = "",
  phone = "",
  onSubmit,
  onCancel = () => {},
  loading = false,
}: UserFormProps) {
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    email,
    address,
    phone,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use validation hook with schema rules
  const { errors, validateForm, isValid } = useFormValidation({
    firstName: validationRules.firstName,
    lastName: validationRules.lastName,
    email: validationRules.email,
    address: validationRules.address,
    phone: validationRules.phone,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || loading) return;

    setIsSubmitting(true);

    try {
      // Validate form using reusable validation hook
      const formErrors = await validateForm(formData);

      if (Object.keys(formErrors).length > 0) {
        toast.error("Please fix the errors in the form");
        return;
      }

      await onSubmit(formData);
    } catch (err) {
      console.error("Error submitting user form:", err);
      toast.error("Failed to save changes");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }
  return (
    <Form
      onSubmit={handleSubmit}
      className="p-6 space-y-4 border shadow-sm bg-card text-card-foreground border-border rounded-xl"
    >
      <Input
        label="First Name"
        name="firstName"
        value={formData.firstName ?? ""}
        error={errors.firstName}
      />

      <Input
        label="Last Name"
        name="lastName"
        value={formData.lastName ?? ""}
        onChange={handleChange}
        placeholder="Enter last name"
        error={errors.lastName}
      />

      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email ?? ""}
        onChange={handleChange}
        placeholder="Enter email"
        required
        error={errors.email}
      />

      <Input
        label="Address"
        name="address"
        value={formData.address ?? ""}
        onChange={handleChange}
        placeholder="Enter address"
        error={errors.address}
      />
      <Input
        label="Phone Number"
        name="phone"
        value={formData.phone ?? ""}
        onChange={handleChange}
        placeholder="Enter phone number"
        error={errors.phone}
      />

      <Button type="submit" disabled={isSubmitting || loading}>
        {isSubmitting || loading ? "Saving..." : "Save Changes"}
      </Button>
      <Button
        type="button"
        variant="secondary"
        onClick={() => {
          onCancel();
        }}
      >
        Cancel
      </Button>
    </Form>
  );
}
