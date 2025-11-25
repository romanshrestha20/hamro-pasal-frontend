"use client";

export const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <p className="mt-1 text-sm text-error">
      {message}
    </p>
  );
};

export default FormError;
