import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // send/receive cookies for cross-site requests
});

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

export default api;

// Helper to set/unset Authorization header for the axios instance
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Request interceptor: attach token from localStorage if available (client-side only)
api.interceptors.request.use((config) => {
  try {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("hp_auth_token");
      if (token) {
        config.headers = config.headers ?? {};
        (config.headers as any)["Authorization"] = `Bearer ${token}`;
      }
    }
  } catch {
    // ignore storage errors
  }
  return config;
});
