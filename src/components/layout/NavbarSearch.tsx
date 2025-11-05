"use client";

import { useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";

interface NavbarSearchProps {
  placeholder?: string;
  className?: string;
}

export function NavbarSearch({
  placeholder = "Search products...",
  className = "",
}: NavbarSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    performSearch();
  };

  const performSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      router.push(`/products?q=${encodeURIComponent(trimmedQuery)}`);
    } else {
      router.push("/products");
    }
    // Blur input on mobile after search
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
    // If already on products page, navigate to clear search
    if (pathname.startsWith("/products")) {
      router.push("/products");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleClear();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative w-full ${className}`}
      role="search"
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border rounded-lg transition-all ${
            isFocused
              ? "border-bright-blue-500 ring-2 ring-bright-blue-500 ring-opacity-20"
              : "border-soft-lavender-500 dark:border-gray-700 hover:border-soft-lavender-600 dark:hover:border-gray-600"
          } focus:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500`}
          aria-label="Search products"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-vivid-red-500 dark:hover:text-vivid-red-400 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search suggestions overlay (future enhancement) */}
      {isFocused && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-soft-lavender-500 dark:border-gray-700 rounded-lg shadow-lg z-50 hidden">
          {/* This can be enhanced with search suggestions in the future */}
          <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
            Press Enter to search for &quot;{query}&quot;
          </div>
        </div>
      )}
    </form>
  );
}
