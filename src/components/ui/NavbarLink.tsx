"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavbarLinkProps {
  href: string;
  label: string;
  className?: string;
  icon?: React.ReactNode;
}

export function NavbarLink({ href, label, className, icon }: NavbarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
        isActive
          ? "text-primary bg-muted"
          : "text-foreground hover:text-primary hover:bg-muted",
        className
      )}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {label}
    </Link>
  );
}
