import { Search } from "lucide-react";
import { handler } from "next/dist/build/templates/app-route";
import { useEffect, useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onSearch?: (value: string) => void;
  defaultValue?: string;
  autoFocus?: boolean;
  debounceTime?: number;
}

export default function SearchBar({
  placeholder = "Search for products...",
  className = "",
  onSearch,
  defaultValue = "",
  autoFocus = false,
  debounceTime = 300,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);

  // Sync with defaultValue changes
  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onSearch) {
        onSearch(query.trim());
      }
    }, debounceTime);
    return () => clearTimeout(handler);
  }, [query, debounceTime, onSearch]);

  return (
    <div className={`relative w-full ${className}`}>
      <label htmlFor="search" className="sr-only"></label>
      <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 pointer-events-none left-3 top-1/2" />
      <input
        type="text"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}
