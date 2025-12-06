"use client";

import { ReactNode } from "react";

interface FormProps {
  children: ReactNode;
  className?: string;
}

export const Form = ({ children, className = "" }: FormProps) => {
  return (
    <form
      className={`
        flex flex-col gap-4
        w-full
        animate-fade-in
        ${className}
      `}
    >
      {children}
    </form>
  );
};
