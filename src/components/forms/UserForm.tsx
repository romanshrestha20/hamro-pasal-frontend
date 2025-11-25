"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import toast from "react-hot-toast";
import LoadingState from "../common/LoadingState";

interface UserFormProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
  }) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

export default function UserForm({
  firstName = "",
  lastName = "",
  email = "",
  address = "",
  onSubmit,
  onCancel = () => {},
  loading = false,
}: UserFormProps) {
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    email,
    address,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || loading) return;

    setIsSubmitting(true);

    try {
      if (!formData.firstName || !formData.email) {
        toast.error("First name and email are required");
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

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-4 border shadow-sm bg-card text-card-foreground border-border rounded-xl"
    >
      <Input
        label="First Name"
        name="firstName"
        value={formData.firstName ?? ""}
        onChange={handleChange}
        placeholder="Enter first name"
        required
      />

      <Input
        label="Last Name"
        name="lastName"
        value={formData.lastName ?? ""}
        onChange={handleChange}
        placeholder="Enter last name"
      />

      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email ?? ""}
        onChange={handleChange}
        placeholder="Enter email"
        required
      />

      <Input
        label="Address"
        name="address"
        value={formData.address ?? ""}
        onChange={handleChange}
        placeholder="Enter address"
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
    </form>
  );
}
