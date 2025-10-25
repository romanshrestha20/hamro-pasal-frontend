"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/useAuth";
import { FormInput } from "@/components/forms/FormInput";
import { GoogleLoginButton } from "@/components/GoogleLoginButton";

interface LoginFormProps {
  onSuccess?: () => void;
  onFailure?: (error: string) => void;
  showForgotPassword?: boolean;
  showRegisterLink?: boolean;
  showGoogleLogin?: boolean;
  redirectTo?: string;
  className?: string;
}

export function LoginForm({
  onSuccess,
  onFailure,
  showForgotPassword = true,
  showRegisterLink = true,
  showGoogleLogin = true,
  className = "",
}: LoginFormProps) {
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = await login(formData);

    if (result?.success) {
      onSuccess?.();
    } else {
      onFailure?.(result?.error || "Login failed");
    }
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

      <FormInput
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
        autoComplete="current-password"
      />

      {showForgotPassword && (
        <div className="text-right">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            Forgot password?
          </Link>
        </div>
      )}

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {showRegisterLink && (
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
      )}

      {showGoogleLogin && (
        <>
          <div>
            <hr className="my-6 border-gray-300 dark:border-gray-700" />
            <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
              Or login with
            </p>
          </div>

          <GoogleLoginButton
            onSuccess={(user) => {
              console.log("Google login successful:", user);
              onSuccess?.();
            }}
            onFailure={(errorMsg) => {
              console.error("Google login failed:", errorMsg);
              onFailure?.(String(errorMsg));
            }}
          />
        </>
      )}
    </form>
  );
}
