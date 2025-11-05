"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import Link from "next/link";

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block text-left ${className}`}
    >
      {/* Trigger button */}
      <button
        type="button"
        aria-haspopup="true"
        onClick={() => setOpen(!open)}
        className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
      >
        {trigger}
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          className={`absolute z-50 mt-2 min-w-48 rounded-lg shadow-lg bg-white border border-gray-200 py-1 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

interface DropdownItemProps {
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
  className = "",
  icon,
}: DropdownItemProps) {
  const baseClasses =
    "w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors";

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${className}`}>
        {icon && <span className="w-4 h-4">{icon}</span>}
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} text-left ${className}`}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </button>
  );
}

export function DropdownDivider() {
  return <div className="my-1 border-t border-gray-200" />;
}
