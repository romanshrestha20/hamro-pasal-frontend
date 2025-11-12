
import type { User, UserUpdatePayload } from "@/lib/types/index";
import { apiRequest } from "@/lib/api/index";

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

export const imageUpload = (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  // Backend responds with: { success: true, message, data: { url: string } }
  return apiRequest<{ success: boolean; message: string; data: { url: string } }>(
    "post",
    "/users/upload",
    formData
  );
};