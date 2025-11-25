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
        <p className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium transition text-primary hover:opacity-80"
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
