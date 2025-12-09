"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "icon" | "outline";
  size?: "default" | "sm" | "lg";
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      asChild = false,
      loading = false,
      iconLeft,
      iconRight,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const buttonClasses = cn(
      // Base
      "inline-flex items-center justify-center font-medium rounded-xl transition-all active:scale-[0.97]",
      "disabled:opacity-60 disabled:cursor-not-allowed select-none",

      // Variants
      variant === "primary" &&
        "bg-primary text-primary-foreground hover:bg-primary/90",

      variant === "secondary" &&
        "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80",

      variant === "ghost" && "text-foreground hover:bg-muted",

      variant === "icon" && "p-2 rounded-xl hover:bg-muted text-foreground",
      variant === "outline" &&
        "border border-border text-foreground hover:bg-accent hover:border-accent-foreground",

      // Sizes
      size === "default" && "px-5 py-2.5 text-sm",
      size === "sm" && "px-3 py-1.5 text-sm",
      size === "lg" && "px-6 py-3 text-base",

      className
    );

    // When asChild, render single child with Slot
    if (asChild) {
      return (
        <Slot ref={ref} className={buttonClasses} {...props}>
          {children}
        </Slot>
      );
    }

    // Regular button
    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={buttonClasses}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 rounded-full border-primary-foreground border-t-transparent animate-spin" />
        ) : (
          <>
            {iconLeft && <span className="mr-2">{iconLeft}</span>}
            {children}
            {iconRight && <span className="ml-2">{iconRight}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
