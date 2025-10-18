import api from "./axios";
import { handleApiError } from "./apiErrorHandler";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

export async function apiRequest<T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: unknown
): Promise<ApiResponse<T>> {
  try {
    const response = await api.request<T>({ method, url, data });
    return { success: true, data: response.data };
  } catch (error) {
    const { message, statusCode } = handleApiError(error);
    return { success: false, error: message, statusCode };
  }
}
