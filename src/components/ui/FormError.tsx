"use client";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return <p className="mt-1 text-sm text-error">{message}</p>;
};

export default FormError;
