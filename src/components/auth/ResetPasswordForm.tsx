"use client";
import { useAuth } from "@/hooks/useAuth";
import React, { useState, ChangeEvent } from "react";
import { AuthForm } from "./AuthForm";
import { Input } from "../ui/Input";
import { FormError } from "../ui/FormError";
import { Button } from "../ui/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ResetPasswordFormProps {
  token?: string;
}
export function ResetPasswordForm({ token = "" }: ResetPasswordFormProps) {
  const router = useRouter();
  const { resetPassword, error, loading } = useAuth();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  // token is provided via page searchParams

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setValidationError(null);
  };

  const validateForm = () => {
    if (newPassword.length < 6)
      return (
        setValidationError("Password must be at least 6 characters"),
        false
      );

    if (newPassword !== confirmNewPassword)
      return (setValidationError("Passwords do not match"), false);

    if (!token) return (setValidationError("Invalid or missing token"), false);

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    await resetPassword(token, newPassword, {
      onSuccess: () => {
        toast.success("Your password has been reset successfully.");
        router.push("/login");
      },
    });
  };

  const displayError = validationError || error;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="space-y-3 text-center">
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-16 h-16 border rounded-full bg-muted border-border">
            <svg
              className="w-8 h-8 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground">
          Reset Your Password
        </h2>

        <p className="text-sm text-muted-foreground">
          Choose a strong password you haven’t used before.
        </p>
      </div>

      {/* FORM */}
      <AuthForm onSubmit={handleSubmit}>
        <Input
          type="password"
          label="New Password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={handleChange}
          required
        />

        <Input
          type="password"
          label="Confirm New Password"
          placeholder="Confirm your new password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
        />

        <FormError message={displayError ?? undefined} />

        <Button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </AuthForm>
    </div>
  );
}
