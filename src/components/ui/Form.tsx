"use client";

import { ReactNode } from "react";

interface FormProps {
  children: ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  å;
}

export const Form = ({ children, className = "" }: FormProps) => {
  return (
    <form
      className={`
        w-full space-y-4
        ${className}
      `}
    >
      {children}
    </form>
  );
};
