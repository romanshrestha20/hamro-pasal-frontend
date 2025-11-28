"use client";

import { useAuth } from "@/hooks/useAuth";
import React, { useState, ChangeEvent } from "react";
import { AuthForm } from "./AuthForm";
import { Input } from "../ui/Input";
import { FormError } from "../ui/FormError";
import { Button } from "../ui/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { forgotPassword, error, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setValidationError(null);
  };

  const validateForm = () => {
    if (!email) return setValidationError("Email is required"), false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return setValidationError("Please enter a valid email address"), false;

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    await forgotPassword(email, {
      onSuccess: () => {
        toast.success("OTP sent to your email.");
        router.push(`/otp-verify?email=${email}`);
      },
    });
  };

  const displayError = validationError || error;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3 text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto border rounded-full bg-muted border-border">
          <svg
            className="w-8 h-8 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-foreground">
          Forgot Password?
        </h2>

        <p className="text-sm text-muted-foreground">
          Enter your email and we will send you a one-time password.
        </p>
      </div>

      {/* Form */}
      <AuthForm>
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="your@email.com"
          required
        />

        <FormError message={displayError ?? undefined} />

        <Button type="submit" disabled={loading} onClick={handleSubmit}>
          {loading ? "Sending..." : "Send OTP"}
        </Button>
      </AuthForm>
    </div>
  );
}
