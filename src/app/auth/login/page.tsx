"use client";

import { AuthCard, LoginForm } from "@/components/auth";

export default function LoginPage() {
  return (
    <AuthCard title="Welcome Back 👋" subtitle="Please login to your account">
      <LoginForm />
    </AuthCard>
  );
}
