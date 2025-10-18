import axios from "axios";
import { toast } from "react-hot-toast";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const handleApiError = (error: unknown): { message: string; statusCode: number } => {
  if (error instanceof AppError) {
    toast.error(error.message);
    return { message: error.message, statusCode: error.statusCode };
  }

  // Handle Axios errors (most common)
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || "API request failed";
    const statusCode = error.response?.status || 500;
    toast.error(message);
    return { message, statusCode };
  }

  // Handle general JS errors
  if (error instanceof Error) {
    toast.error(error.message);
    return { message: error.message, statusCode: 500 };
  }

  toast.error("An unexpected error occurred");
  return { message: "An unexpected error occurred", statusCode: 500 };
};
