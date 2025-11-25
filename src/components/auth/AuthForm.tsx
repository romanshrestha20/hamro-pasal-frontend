"use client";

import { ReactNode } from "react";

interface AuthFormProps {
  children: ReactNode;
  className?: string;
}

export const AuthForm = ({ children, className = "" }: AuthFormProps) => {
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
