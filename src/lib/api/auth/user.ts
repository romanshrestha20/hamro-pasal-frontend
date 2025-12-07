
import type { User, UserUpdatePayload } from "@/lib/types/index";
import { apiRequest } from "@/lib/api/index";

// Helper to build Axios config with optional signal and params like pagination and filters
type RequestOptions = { signal?: AbortSignal; params?: Record<string, unknown> };
const withConfig = (options?: RequestOptions) =>
  options ? { signal: options.signal, params: options.params } : undefined;

export const updateUser = (
  userId: string,
  updatedData: UserUpdatePayload,
  options?: RequestOptions
) => apiRequest<User>("put", `/users/${userId}`, updatedData, withConfig(options));

export const deleteUser = (userId: string, options?: RequestOptions) =>
  apiRequest<void>("delete", `/users/${userId}`, undefined, withConfig(options));

export const getAllUsers = (options?: RequestOptions) =>
  apiRequest<User[]>("get", "/users/all", undefined, withConfig(options));

