"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InfoRowProps {
  label: string;
  value: ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export function InfoRow({
  label,
  value,
  className,
  labelClassName,
  valueClassName,
}: InfoRowProps) {
  return (
    <div className={cn("flex justify-between items-center", className)}>
      <span className={cn("text-sm text-muted-foreground", labelClassName)}>
        {label}
      </span>
      <span className={cn("font-medium", valueClassName)}>{value}</span>
    </div>
  );
}
