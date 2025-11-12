"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import toast from "react-hot-toast";

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
  loading?: boolean;
}

export default function UserForm({
  firstName = "",
  lastName = "",
  email = "",
  address = "",
  onSubmit,
  loading = false,
}: UserFormProps) {
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    email,
    address,
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state for disabling button

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (isSubmitting || loading) return;
    e.preventDefault();
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
      className="p-4 space-y-4 bg-white shadow rounded-xl"
    >
      <div>
        <Input
          label="First Name"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter first name"
          required
        />
      </div>

      <div>
        <Input
          label="Last Name"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter last name"
        />
      </div>

      <div>
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />
      </div>

      <div>
        <Input
          label="Address"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter address"
        />
      </div>

      <Button
        label="Save Changes"
        type="submit"
        disabled={isSubmitting || loading}
      >
        {isSubmitting || loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
