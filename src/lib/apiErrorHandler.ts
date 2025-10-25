import axios from "axios";
import { toast } from "react-hot-toast";

// Specific, typed error codes for granular handling in UI
export enum ApiErrorCode {
  Unauthorized = "UNAUTHORIZED",
  Forbidden = "FORBIDDEN",
  NotFound = "NOT_FOUND",
  Conflict = "CONFLICT",
  Validation = "VALIDATION_ERROR",
  Network = "NETWORK_ERROR",
  Timeout = "TIMEOUT",
  Server = "SERVER_ERROR",
  Unknown = "UNKNOWN_ERROR",
}

export type ApiHandledError = {
  message: string;
  statusCode: number;
  code: ApiErrorCode;
  // Optional field-level validation errors coming from backend (e.g., Zod)
  fieldErrors?: Array<{ path?: string | (string | number)[]; message: string }>;
};

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const handleApiError = (error: unknown): ApiHandledError => {
  // Custom AppError usage in client code
  if (error instanceof AppError) {
    toast.error(error.message);
    return {
      message: error.message,
      statusCode: error.statusCode,
      code: mapStatusToCode(error.statusCode),
    };
  }

  // Axios errors (most common path)
  if (axios.isAxiosError(error)) {
    // Distinguish no response (network) vs response with status
    if (!error.response) {
      const isTimeout = error.code === "ECONNABORTED";
      const code = isTimeout ? ApiErrorCode.Timeout : ApiErrorCode.Network;
      const message = isTimeout
        ? "Request timed out. Please try again."
        : "Network error. Please check your connection.";
      toast.error(message);
      return { message, statusCode: 0, code };
    }

    const statusCode = error.response.status || 500;
    type ApiErrorResponse = {
      message?: string;
      errors?: Array<{ path?: string | (string | number)[]; message: string }>;
    };
    const data = (error.response.data ?? {}) as ApiErrorResponse;
    const message = data?.message || defaultMessageForStatus(statusCode);

    // Capture Zod-like validation errors when present
    const fieldErrors = Array.isArray(data?.errors) ? data.errors : undefined;

    // Gentle toasts: avoid duplicating toasts for 401 in silent areas
    toast.error(message);

    return {
      message,
      statusCode,
      code: mapStatusToCode(statusCode, !!fieldErrors),
      fieldErrors,
    };
  }

  // Generic Errors
  if (error instanceof Error) {
    toast.error(error.message);
    return {
      message: error.message,
      statusCode: 500,
      code: ApiErrorCode.Unknown,
    };
  }

  const message = "An unexpected error occurred";
  toast.error(message);
  return { message, statusCode: 500, code: ApiErrorCode.Unknown };
};

function mapStatusToCode(status: number, hasFieldErrors = false): ApiErrorCode {
  if (hasFieldErrors || status === 422 || status === 400) return ApiErrorCode.Validation;
  if (status === 401) return ApiErrorCode.Unauthorized;
  if (status === 403) return ApiErrorCode.Forbidden;
  if (status === 404) return ApiErrorCode.NotFound;
  if (status === 409) return ApiErrorCode.Conflict;
  if (status >= 500) return ApiErrorCode.Server;
  return ApiErrorCode.Unknown;
}

function defaultMessageForStatus(status: number): string {
  switch (status) {
    case 400:
    case 422:
      return "Invalid input. Please check your entries.";
    case 401:
      return "Please log in to continue.";
    case 403:
      return "You don't have permission to perform this action.";
    case 404:
      return "Resource not found.";
    case 409:
      return "A conflict occurred. Please try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}
