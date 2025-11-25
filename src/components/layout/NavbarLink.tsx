"use client";

import Link from "next/link";

interface NavbarLinkProps {
  href: string;
  label: string;
  className?: string;
}
export function NavbarLink({ href, label, className = "" }: NavbarLinkProps) {
  return (
    <Link
      href={href}
      className={`
        text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors ${className}`}
    >
      {label}
    </Link>
  );
}