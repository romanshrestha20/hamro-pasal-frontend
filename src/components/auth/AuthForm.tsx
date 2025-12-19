"use client";

import { ReactNode } from "react";

interface AuthFormProps {
  children: ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const AuthForm = ({
  children,
  className = "",
  onSubmit,
}: AuthFormProps) => {
  return (
    <form
      className={`
        flex flex-col gap-4
        w-full
        animate-fade-in
        ${className}
      `}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};
