"use client";
import Link from "next/link";
import { RegisterForm } from "@/components/auth";
import { AuthCard } from "@/components/auth/AuthCard";

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create an Account 📝"
      subtitle="Sign up to get started"
      footer={
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            Log in
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}
