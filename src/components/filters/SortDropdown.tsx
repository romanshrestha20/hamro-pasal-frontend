"use client";

import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "priceLowHigh", label: "Price: Low → High" },
  { value: "priceHighLow", label: "Price: High → Low" },
  { value: "nameAZ", label: "Name: A → Z" },
  { value: "nameZA", label: "Name: Z → A" },
];

export function SortDropdown({ value, onChange }: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        className="inline-flex items-center justify-between w-40 px-4 py-2 text-sm transition-colors border rounded-md shadow-sm  border-border bg-card text-card-foreground hover:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="Sort products"
      >
        <Select.Value />
        <ChevronDown className="w-4 h-4 opacity-70" />
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="overflow-hidden border rounded-md shadow-xl  bg-card border-border animate-in fade-in-80 zoom-in-95"
          position="popper"
        >
          <Select.Viewport className="p-1">
            {sortOptions.map((opt) => (
              <Select.Item
                key={opt.value}
                value={opt.value}
                className="flex items-center justify-between px-3 py-2 text-sm transition-colors rounded-sm outline-none cursor-pointer select-none  text-card-foreground hover:bg-muted focus:bg-muted"
              >
                <Select.ItemText>{opt.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <Check className="w-4 h-4 text-accent" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
