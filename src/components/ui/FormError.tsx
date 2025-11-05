"use client";

import { Toast } from "react-hot-toast";

export const FormError = ({ message }: { message?: string }) =>
  message ? <p className="text-sm text-red-600">{message}</p> : null;


export default FormError;
