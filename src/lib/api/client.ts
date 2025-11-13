
import api from "./api";
import type { AxiosRequestConfig } from "axios";
import { handleApiError, ApiErrorCode, ApiHandledError } from "./error";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
  errorCode?: ApiErrorCode;
  fieldErrors?: ApiHandledError["fieldErrors"];
}

export async function apiRequest<T>(
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response = await api.request<T>({ method, url, data, ...(config ?? {}) });
    return { success: true, data: response.data };
  } catch (error) {
    const { message, statusCode, code, fieldErrors } = handleApiError(error);
    return { success: false, error: message, statusCode, errorCode: code, fieldErrors };
  }
}
