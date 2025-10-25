"use client";

import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { handleGoogleAuth } from "@/lib/auth/googleAuthHandler";
import { useRouter } from "next/navigation";
import type { User } from "@/types/Users";
import LoadingState from "./LoadingState";
import toast from "react-hot-toast";
import { useAuth } from "@/lib/auth/useAuth";
import { useState } from "react";

interface GoogleLoginButtonProps {
  onSuccess?: (user: User) => void;
  onFailure?: (error: unknown) => void;
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onSuccess,
  onFailure,
}) => {
  const { refreshUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleError = () => {
    toast.error("Google login failed");
    onFailure?.(new Error("Google login failed"));
  };

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    setLoading(true);
    try {
      const result = await handleGoogleAuth({
        credentialResponse,
        onSuccess: async (user: User) => {
          await refreshUser();
          toast.success(`Welcome, ${user.firstName}!`);
          onSuccess?.(user);
        },
        onFailure,
        onRedirect: (path) => {
          router.push(path);
        },
      });

      if (result?.success) {
        toast.success("Login successful!");
        refreshUser();
      } else {
        toast.error("Google login failed");
      }
    } catch (error) {
      toast.error("Something went wrong during Google login");
      onFailure?.(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-2">
      {loading ? (
        <LoadingState message="Signing you in..." />
      ) : (
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      )}
    </div>
  );
};
