"use client";

import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "dashed" | "thick";
}

export function Divider({
  className,
  orientation = "horizontal",
  variant = "default",
}: DividerProps) {
  return (
    <div
      role="separator"
      className={cn(
        // Base
        "bg-border",
        // Orientation
        orientation === "horizontal" && "h-px w-full my-2",
        orientation === "vertical" && "w-px h-full mx-2",
        // Variant
        variant === "dashed" && "border-dashed border-t",
        variant === "thick" && orientation === "horizontal" && "h-0.5",
        variant === "thick" && orientation === "vertical" && "w-0.5",
        className
      )}
    />
  );
}
