"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/useAuth";
import { FormInput } from "@/components/forms/FormInput";
import { toast } from "react-hot-toast";
import { User } from "@/types/Users";

interface RegisterFormProps {
  onSuccess?: (user: User) => void;
  onFailure?: (error: string) => void;
  showLoginLink?: boolean;
  className?: string;
}

export function RegisterForm({
  onSuccess,
  onFailure,
  showLoginLink = true,
  className = "",
}: RegisterFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const { loading, error, register } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await register(formData, {
      onSuccess: (user) => {
        toast.success(`Account created! Welcome, ${user.firstName}!`);
        onSuccess?.(user);
      },
      onFailure: (message) => {
        toast.error(`Registration failed: ${message}`);
        onFailure?.(message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <FormInput
        type="email"
        placeholder="Email address"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        autoComplete="email"
      />

      <div className="flex gap-3">
        <FormInput
          type="text"
          placeholder="First name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          required
          autoComplete="given-name"
          className="w-1/2"
        />
        <FormInput
          type="text"
          placeholder="Last name"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          required
          autoComplete="family-name"
          className="w-1/2"
        />
      </div>

      <FormInput
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
        autoComplete="new-password"
      />

      <div className="min-h-[24px]">
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Register"}
      </button>

      {showLoginLink && (
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      )}
    </form>
  );
}
