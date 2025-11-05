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
    setValidationError(null); // Clear validation error on input change
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

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="remember" className="ml-2 text-gray-600">
            Remember me
          </label>
        </div>
        <Link
          href="/forgot-password"
          className="text-blue-600 hover:text-blue-700"
        >
          Forgot password?
        </Link>
      </div>

      <FormError message={displayError ?? undefined} />

      <Button
        label="Sign In"
        type="submit"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </Button>

      <div className="flex items-center justify-center mt-4">
        <div className="border-t border-gray-300 grow mx-2" />
        <span className="text-sm text-gray-500">or</span>
        <div className="border-t border-gray-300 grow mx-2" />
      </div>

      <GoogleSignButton />
    </AuthForm>
  );
};
