"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { loginUser } from "@/lib/authApi";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { GoogleLoginButton } from "@/components/GoogleLoginButton";
import { useAuth } from "@/lib/auth/useAuth";

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-800"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm">
          Please login to your account
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-5 text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
        <div>
          <hr className="my-6 border-gray-300 dark:border-gray-700" />
          <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
            Or login with
          </p>
        </div>

        <GoogleLoginButton
          onSuccess={(user) => {
            console.log("Google login successful:", user);
          }}
          onFailure={(error) => {
            console.error("Google login failed:", error);
          }}
        />
      </motion.form>
    </div>
  );
}
