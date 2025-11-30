"use client";

import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  forgotPassword as forgotPasswordApi,
  verifyOtp as verifyOtpApi,
  resetPassword as resetPasswordApi,
  changePassword as changePasswordApi,
} from "@/lib/api/auth/index";
import { setAuthToken } from "@/lib/api/api";
import { updateUser as apiUpdateUser } from "@/lib/api/auth/index";
import type { User, UserUpdatePayload } from "@/lib/types";
import type { LoginPayload, RegisterPayload } from "@/lib/api/auth/index";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CredentialResponse } from "@react-oauth/google";
import { handleGoogleAuth } from "@/lib/api/auth/googleAuthHandler";

import { handleApiError } from "@/lib/api/error";

// Typed result for auth actions
export type AuthResult =
  | { success: true; user: User }
  | { success: false; error: string };

// Options for auth actions
export interface AuthActionOptions {
  onSuccess?: (user?: User) => void;
  onRedirect?: (path: string) => void;
  onFailure?: (message: string) => void;
}

export interface OtpVerifyOptions {
  onSuccess?: (resetToken: string) => void;
  onRedirect?: (path: string) => void;
  onFailure?: (message: string) => void;
}

// Auth context type definition with all auth-related state and actions
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (
    payload: LoginPayload,
    options?: AuthActionOptions
  ) => Promise<AuthResult>;
  register: (
    payload: RegisterPayload,
    options?: AuthActionOptions
  ) => Promise<AuthResult>;
  logout: () => Promise<void>;
  googleAuth: (
    credentialResponse: CredentialResponse,
    options?: AuthActionOptions
  ) => Promise<AuthResult>;
  refreshUser: () => Promise<void>;
  updateUser: (
    userId: string,
    updatedData: UserUpdatePayload,
    options?: AuthActionOptions
  ) => Promise<AuthResult>;
  forgotPassword: (
    email: string,
    options?: AuthActionOptions
  ) => Promise<AuthResult>;
  verifyOtp: (
    email: string,
    otp: string,
    options?: OtpVerifyOptions
  ) => Promise<AuthResult>;
  resetPassword: (
    token: string,
    newPassword: string,
    options?: AuthActionOptions
  ) => Promise<AuthResult>;
  changePassword: (
    oldPassword: string,
    newPassword: string,
    options?: AuthActionOptions
  ) => Promise<AuthResult>;
}

// Create the AuthContext with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  error: null,
  login: async () => ({
    success: false,
    error: "Auth provider not initialized",
  }),
  register: async () => ({
    success: false,
    error: "Auth provider not initialized",
  }),
  logout: async () => {},
  googleAuth: async () => ({
    success: false,
    error: "Auth provider not initialized",
  }),
  refreshUser: async () => {},
  updateUser: async () => ({
    success: false,
    error: "Auth provider not initialized",
  }),
  forgotPassword: async () => ({
    success: false,
    error: "Auth provider not initialized",
  }),
  verifyOtp: async () => ({
    success: false,
    error: "Auth provider not initialized",
  }),
  resetPassword: async () => ({
    success: false,
    error: "Auth provider not initialized",
  }),
  changePassword: async () => ({
    success: false,
    error: "Auth provider not initialized",
  }),
});

// Helper function to save auth token to localStorage and set in API client
const saveAuthToken = (token?: string) => {
  if (!token) return;
  if (typeof window !== "undefined") {
    window.localStorage.setItem("hp_auth_token", token);
  }
  setAuthToken(token);
};

// AuthProvider component to wrap the app and provide auth state/actions
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Function to refresh the current user state from the backend
  const refreshUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCurrentUser();
      if (response.success && response.data) {
        setUser(response.data);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Error fetching current user:", err);
      handleApiError(err);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // On component mount, refresh the user state
  useEffect(() => {
    let isMounted = true;

    // IIFE to refresh user if component is still mounted
    (async () => {
      if (isMounted) {
        try {
          if (typeof window !== "undefined") {
            const token = window.localStorage.getItem("hp_auth_token");
            if (token) setAuthToken(token);
          }
        } catch (err) {
          console.error("Error setting auth token:", err);
          handleApiError(err);
        }
        await refreshUser();
      }
    })();

    // Cleanup function to set isMounted to false on unmount
    return () => {
      isMounted = false;
    };
  }, [refreshUser]);

  // Login function to authenticate users
  const login = async (
    payload: LoginPayload,
    options?: AuthActionOptions
  ): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(payload);

      if (response.success && response.data?.user) {
        const user = response.data.user;
        const token = (response.data as any).token as string | undefined;
        saveAuthToken(token);
        toast.success("Logged in successfully!");
        await refreshUser(); //  update global auth state
        router.push("/products");
        options?.onSuccess?.(user);
        return { success: true, user };
      } else {
        const message = response.error || "Invalid credentials";
        setError(message);

        options?.onFailure?.(message);
        return { success: false, error: message };
      }
    } catch (err) {
      const handled = handleApiError(err);
      setError(handled.message);
      options?.onFailure?.(handled.message);
      return { success: false, error: handled.message };
    } finally {
      setLoading(false);
    }
  };

  // Registration function to create new user accounts
  const register = async (
    payload: RegisterPayload,
    options?: AuthActionOptions
  ): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerUser(payload);

      if (response.success && response.data?.user) {
        const user = response.data.user;
        const token = (response.data as any).token as string | undefined;
        saveAuthToken(token);
        toast.success("Account created successfully!");
        await refreshUser(); // log in immediately
        router.push("/products");
        options?.onSuccess?.(user);
        return { success: true, user };
      } else {
        const message = response.error || "Registration failed";
        setError(message);

        options?.onFailure?.(message);
        return { success: false, error: message };
      }
    } catch (err) {
      const handled = handleApiError(err);
      setError(handled.message);
      options?.onFailure?.(handled.message);
      return {
        success: false,
        error: handled.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // Update function to modify existing user accounts
  const updateUser = async (
    userId: string,
    updatedData: UserUpdatePayload,
    options?: AuthActionOptions
  ): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    const prev = user;
    try {
      const response = await apiUpdateUser(userId, updatedData);

      if (response.success && response.data) {
        const updatedUser = response.data;
        // update local state so app reflects new user data
        setUser(updatedUser);
        setIsAuthenticated(true);
        toast.success("Account updated successfully!");
        options?.onSuccess?.(updatedUser);
        return { success: true, user: updatedUser };
      } else {
        const message = response.error || "Update failed";
        setError(message);

        options?.onFailure?.(message);
        return { success: false, error: message };
      }
    } catch (err) {
      const handled = handleApiError(err);
      setUser(prev);
      setError(handled.message);
      options?.onFailure?.(handled.message);
      return {
        success: false,
        error: handled.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function to end user sessions
  const logout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      setUser(null);
      setIsAuthenticated(false);
      try {
        if (typeof window !== "undefined") {
          window.localStorage.removeItem("hp_auth_token");
        }
      } catch {}
      setAuthToken(null);
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (err) {
      const handled = handleApiError(err);
      setError(handled.message);
    } finally {
      setLoading(false);
    }
  };

  // Google authentication function
  const googleAuth = async (
    credentialResponse: CredentialResponse,
    options?: AuthActionOptions
  ): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    try {
      const result = await handleGoogleAuth({
        credentialResponse,
        onSuccess: async (user: User) => {
          await refreshUser();
          toast.success(`Welcome, ${user.firstName}!`);
          options?.onSuccess?.(user);
        },
        onFailure: (err) => {
          const message =
            err instanceof Error ? err.message : "Google login failed";
          options?.onFailure?.(message);
        },
        onRedirect: (path) => {
          router.push(path);
        },
      });

      if (result?.success && result.user) {
        const token = (result as any).token as string | undefined;
        saveAuthToken(token);
        toast.success("Logged in successfully!");
        await refreshUser();
        router.push("/products");
        return { success: true, user: result.user };
      } else {
        const message = "Google login failed";
        setError(message);

        return { success: false, error: message };
      }
    } catch (err) {
      const handled = handleApiError(err);
      setError(handled.message);

      return { success: false, error: handled.message };
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (
    email: string,
    options?: AuthActionOptions
  ): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    try {
      const response = await forgotPasswordApi({ email });

      if (response.success && response.data) {
        const message = response.data.message;
        toast.success(message);
        options?.onSuccess?.();
        return { success: true, user: null as any };
      } else {
        const message = response.error || "Forgot password request failed";
        setError(message);

        options?.onFailure?.(message);
        return { success: false, error: message };
      }
    } catch (err) {
      const handled = handleApiError(err);
      setError(handled.message);

      options?.onFailure?.(handled.message);
      return {
        success: false,
        error: handled.message,
      };
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (
    email: string,
    otp: string,
    options?: OtpVerifyOptions
  ): Promise<AuthResult> => {
    setLoading(true);
    setError(null);

    try {
      const response = await verifyOtpApi({ email, otp });

      if (response.success) {
        // response.data.resetToken now properly typed
        const { message, resetToken } = response.data!;

        toast.success(message);
        options?.onSuccess?.(resetToken);

        return { success: true, user: undefined as any };
      } else {
        const message = response.error || "OTP verification failed";
        setError(message);
        options?.onFailure?.(message);

        return { success: false, error: message };
      }
    } catch (err) {
      const handled = handleApiError(err);
      setError(handled.message);

      options?.onFailure?.(handled.message);
      return { success: false, error: handled.message };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (
    token: string,
    newPassword: string,
    options?: AuthActionOptions
  ): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    try {
      const response = await resetPasswordApi({
        token,
        newPassword,
      });

      if (response.success && response.data) {
        const message = response.data.message;
        toast.success(message);
        options?.onSuccess?.();
        return { success: true, user: null as any };
      } else {
        const message = response.error || "Reset password request failed";
        setError(message);

        options?.onFailure?.(message);
        return { success: false, error: message };
      }
    } catch (err) {
      const handled = handleApiError(err);
      setError(handled.message);
      options?.onFailure?.(handled.message);
      return {
        success: false,
        error: handled.message,
      };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (
    oldPassword: string,
    newPassword: string,
    options?: AuthActionOptions
  ): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    try {
      const response = await changePasswordApi({
        oldPassword,
        newPassword,
      });

      if (response.success && response.data) {
        const message = response.data.message;
        toast.success(message);
        options?.onSuccess?.();
        return { success: true, user: null as any };
      } else {
        const message = response.error || "Change password request failed";
        setError(message);

        options?.onFailure?.(message);
        return { success: false, error: message };
      }
    } catch (err) {
      const handled = handleApiError(err);
      setError(handled.message);
      options?.onFailure?.(handled.message);
      return {
        success: false,
        error: handled.message,
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        loading,
        isAuthenticated,
        error,
        logout,
        googleAuth,
        refreshUser,
        updateUser,
        forgotPassword,
        verifyOtp,
        resetPassword,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
