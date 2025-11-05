"use client";

import { useAuth } from "@/hooks/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

export const GoogleSignButton = () => {
  const { googleAuth, loading } = useAuth();

  return (
    <div className="flex flex-col items-center w-full mt-2">
      <div className="w-full flex items-center justify-center">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            googleAuth(credentialResponse);
          }}
          onError={() => {
            toast.error("Google Sign-In failed. Please try again.");
          }}
          useOneTap={false}
          theme="outline"
          text="continue_with"
          shape="pill"
          logo_alignment="left"
          width="100%"
        />
      </div>
      {loading && (
        <p className="text-sm text-gray-500 mt-2 animate-pulse">
          Connecting with Google...
        </p>
      )}
    </div>
  );
};
