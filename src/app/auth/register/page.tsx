"use client";

import { AuthCard, RegisterForm } from "@/components/auth";

export default function RegisterPage() {
  return (
    <AuthCard title="Create an Account" subtitle="Join us today!">
      <RegisterForm />
    </AuthCard>
  );
}
