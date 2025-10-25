"use client";

import {
  createContext,
  useContext,
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
} from "@/lib/authApi";
import type { User } from "@/types/Users";
import type { LoginPayload, RegisterPayload } from "@/lib/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CredentialResponse } from "@react-oauth/google";
import { handleGoogleAuth } from "./googleAuthHandler";

// Typed result for auth actions
export type AuthResult =
  | { success: true; user: User }
  | { success: false; error: string };

export interface AuthActionOptions {
  onSuccess?: (user: User) => void;
  onFailure?: (message: string) => void;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
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
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  error: null,
  refreshUser: async () => {},
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
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
      setError(err instanceof Error ? err.message : "Failed to fetch user");
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);
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
        toast.success("Login successful!");
        await refreshUser(); // ✅ update global auth state
        router.push("/dashboard");
        options?.onSuccess?.(user);
        return { success: true, user };
      } else {
        const message = response.error || "Invalid credentials";
        setError(message);
        toast.error(message);
        options?.onFailure?.(message);
        return { success: false, error: message };
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
      options?.onFailure?.("Something went wrong. Please try again.");
      return {
        success: false,
        error: "Something went wrong. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

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
        toast.success("Account created successfully!");
        await refreshUser(); // ✅ log in immediately
        router.push("/dashboard");
        options?.onSuccess?.(user);
        return { success: true, user };
      } else {
        const message = response.error || "Registration failed";
        setError(message);
        toast.error(message);
        options?.onFailure?.(message);
        return { success: false, error: message };
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
      options?.onFailure?.("Something went wrong. Please try again.");
      return {
        success: false,
        error: "Something went wrong. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Logged out successfully!");
      router.push("/auth/login");
    } catch (err) {
      console.error("Error during logout:", err);
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  // google auth
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
        toast.success("Login successful!");
        await refreshUser();
        router.push("/dashboard");
        return { success: true, user: result.user };
      } else {
        const message = "Google login failed";
        setError(message);
        toast.error(message);
        return { success: false, error: message };
      }
    } catch {
      const message = "Something went wrong during Google login";
      setError(message);
      toast.error(message);
      options?.onFailure?.(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        loading,
        isAuthenticated,
        error,
        refreshUser,
        logout,
        googleAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
