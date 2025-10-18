import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
})


api.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
        if (config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return config;
});

// Define ApiResponse interface here to avoid circular dependency issues
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}


export default api;