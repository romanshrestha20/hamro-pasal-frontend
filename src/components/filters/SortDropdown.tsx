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
    <div className={`relative inline-block w-1/2 ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md appearance-none dark:bg-gray-800 dark:border-gray-700"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute w-5 h-5 text-gray-500 pointer-events-none left-33 top-2" />
    </div>
  );
}
