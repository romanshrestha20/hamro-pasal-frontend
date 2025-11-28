"use client";

import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-background">
      <div className="w-full max-w-md p-8 border shadow-lg bg-card rounded-2xl border-border">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
