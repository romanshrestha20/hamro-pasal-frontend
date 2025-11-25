"use client";
import { useAuth } from "@/hooks/useAuth";
import React, { useState, ChangeEvent } from "react";
import { AuthForm } from "./AuthForm";
import { Input } from "../ui/Input";
import { FormError } from "../ui/FormError";
import { Button } from "../ui/Button";
import { GoogleSignButton } from "./GoogleSignButton";
import Link from "next/link";

export const LoginForm = () => {
  const { login, error, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password) {
      setValidationError("Email and password are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    await login(formData);
  };

  const displayError = validationError || error;

  return (
    <AuthForm>
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        required
        autoComplete="email"
      />

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
        required
        autoComplete="current-password"
      />

      {/* Remember me + forgot password */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
          />
          <span className="text-muted-foreground">Remember me</span>
        </label>

        <Link
          href="/forgot-password"
          className="transition text-primary hover:opacity-80"
        >
          Forgot password?
        </Link>
      </div>

      {/* Error Message */}
      <FormError message={displayError ?? undefined} />

      {/* Submit Button */}
      <Button
        type="submit"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </Button>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-4">
        <div className="flex-grow border-t border-border" />
        <span className="mx-3 text-sm text-muted-foreground">or</span>
        <div className="flex-grow border-t border-border" />
      </div>

      {/* Google sign in */}
      <GoogleSignButton />
    </AuthForm>
  );
};
