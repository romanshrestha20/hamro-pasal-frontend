"use client";
import { LoginForm } from "@/components/auth";
import { AuthCard } from "@/components/auth/AuthCard";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome Back 👋"
      subtitle="Sign in to your account"
      footer={
        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            Sign up
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}
