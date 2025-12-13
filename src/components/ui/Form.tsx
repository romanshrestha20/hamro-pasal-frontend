"use client";

import { ReactNode } from "react";

interface FormProps {
  children: ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Form = ({ children, className = "", onSubmit }: FormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`
        w-full space-y-4
        ${className}
      `}
    >
      {children}
    </form>
  );
};
