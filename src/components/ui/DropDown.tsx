"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils"; // if you have a class combiner

interface DropDownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}

export default function DropDown({
  trigger,
  children,
  align = "left",
  className = "",
}: DropDownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* 🧯 Close when clicking outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      {/* Trigger */}
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {trigger}
      </button>

      {/* Menu */}
      {open && (
        <div
          role="menu"
          className={cn(
            "absolute z-50 mt-2 min-w-[12rem] rounded-lg shadow-md border",
            "bg-card border-border text-card-foreground dropdown-animate",
            /* Glass blur effect */
            "backdrop-blur-md bg-card/90",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/* 🎯 Reusable Item Component */
interface ItemProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  icon?: ReactNode;
}

export function DropdownItem({
  children,
  onClick,
  href,
  className,
  icon,
}: ItemProps) {
  const base =
    "flex items-center gap-2 w-full px-4 py-2 text-sm cursor-pointer transition-colors text-card-foreground hover:bg-muted focus:bg-muted focus:outline-none";

  if (href) {
    return (
      <Link href={href} className={cn(base, className)} role="menuitem">
        {icon && <span className="w-4 h-4">{icon}</span>}
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      role="menuitem"
      className={cn(base, className, "text-left")}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </button>
  );
}

/* ➖ Divider */
export function DropdownDivider() {
  return <div className="my-1 border-t border-border" role="separator" />;
}
