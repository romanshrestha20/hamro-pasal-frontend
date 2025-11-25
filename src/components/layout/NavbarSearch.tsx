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
    router.push(trimmedQuery ? `/products?q=${encodeURIComponent(trimmedQuery)}` : "/products");
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
    if (pathname.startsWith("/products")) router.push("/products");
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`} role="search">
      <div className="relative rounded-lg bg-muted">
        <Search className="absolute w-5 h-5 -translate-y-1/2 pointer-events-none left-3 top-1/2 text-muted-foreground" />

        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`
            w-full pl-10 pr-10 py-2 rounded-lg border bg-background text-foreground
            placeholder:text-muted-foreground transition-all
            border-input hover:border-primary focus:border-primary
            focus:ring-2 focus:ring-primary/30 focus:outline-none
          `}
          aria-label="Search products"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute transition-colors -translate-y-1/2 right-3 top-1/2 text-muted-foreground hover:text-error"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isFocused && query.length >= 2 && (
        <div
          className="absolute left-0 right-0 z-50 mt-2 border rounded-lg shadow-lg bg-card border-input top-full"
        >
          <div className="p-4 text-sm text-muted-foreground">
            Press Enter to search for &quot;{query}&quot;
          </div>
        </div>
      )}
    </form>
  );
}
