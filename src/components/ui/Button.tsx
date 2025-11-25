"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "icon";
  size?: "default" | "sm" | "lg";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      asChild = false,
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl",

          // Variants
          variant === "primary" &&
            "bg-primary text-primary-foreground hover:bg-accent",

          variant === "secondary" &&
            "bg-secondary text-secondary-foreground border border-border hover:bg-muted",

          variant === "ghost" &&
            "hover:bg-muted text-foreground",

          variant === "icon" &&
            "p-2 rounded-xl hover:bg-muted text-foreground",

          // Sizes
          size === "default" && "px-5 py-2.5 text-sm",
          size === "sm" && "px-3 py-1.5 text-sm",
          size === "lg" && "px-6 py-3 text-base",

          className
        )}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 rounded-full animate-spin border-t-transparent border-foreground"></span>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";
