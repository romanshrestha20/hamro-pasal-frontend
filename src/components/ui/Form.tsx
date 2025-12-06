"use client";

import { ReactNode } from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export const Form = ({ children, className = "", onSubmit }: FormProps) => {
  return (
    <form
      onSubmit={onSubmit}
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
