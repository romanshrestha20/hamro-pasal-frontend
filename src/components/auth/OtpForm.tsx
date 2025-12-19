"use client";

import { useState } from "react";
import { toast } from "react-hot-toast/headless";
import { useAuth } from "@/hooks/useAuth";
import { Button, Input } from "../ui";
import { useRouter } from "next/navigation";
import { AuthForm } from "./AuthForm";

interface OtpFormProps {
  email: string;
}

export function OtpForm({ email }: OtpFormProps) {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const { verifyOtp } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const validateForm = (): boolean => {
    if (!otp) {
      toast.error("OTP is required");
      return false;
    }
    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits long");
      return false;
    }
    return true;
  };

  const handleOtpVerifySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    await verifyOtp(email, otp, {
      onSuccess: (resetToken) => {
        router.push(`/reset-password?token=${encodeURIComponent(resetToken)}`);
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="space-y-3 text-center">
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-16 h-16 border rounded-full bg-muted border-border">
            <svg
              className="w-8 h-8 text-success"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground">Verify OTP</h2>

        <p className="text-sm text-muted-foreground">
          A 6-digit verification code was sent to{" "}
          <span className="font-semibold text-foreground">{email}</span>.
        </p>
      </div>

      {/* FORM */}
      <AuthForm onSubmit={handleOtpVerifySubmit}>
        <Input
          label="One-Time Password (OTP)"
          type="text"
          value={otp}
          onChange={handleChange}
          placeholder="123456"
          maxLength={6}
        />

        <Button type="submit" className="w-full mt-4">
          Verify OTP
        </Button>

        <p className="mt-3 text-xs text-center text-muted-foreground">
          Didn’t receive the code? Check your spam folder or try again.
        </p>
      </AuthForm>
    </div>
  );
}
