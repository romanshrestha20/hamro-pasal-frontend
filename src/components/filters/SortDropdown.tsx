import { ChevronDown } from "lucide-react";

export interface SortDropdownProps {
  value: string;
  onChange: (sortBy: string) => void;
  className?: string;
}

export default function SortDropdown({
  value,
  onChange,
  className,
}: SortDropdownProps) {
  const options = [
    { value: "newest", label: "Newest" },
    { value: "priceLowHigh", label: "Price: Low → High" },
    { value: "priceHighLow", label: "Price: High → Low" },
    { value: "nameAZ", label: "Name: A → Z" },
    { value: "nameZA", label: "Name: Z → A" },
  ];

  return (
    <div className={`relative inline-block w-1/2 ${className || ""}`}>
      <select
        aria-label="Sort products"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full px-4 py-2 pr-10 text-sm border rounded-md shadow-sm appearance-none border-border bg-card text-card-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute w-4 h-4 -translate-y-1/2 pointer-events-none right-3 top-1/2 text-muted-foreground" />
    </div>
  );
}
