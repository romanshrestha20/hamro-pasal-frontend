"use client";

import { Grid3x3, List } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  className?: string;
  mode: "grid" | "list";
  onChange: (mode: "grid" | "list") => void;
}

export default function ViewModeToggle({ className, mode, onChange }: Props) {
  return (
    <div
      className={`
        flex gap-2 px-1 rounded-lg border border-border bg-secondary text-secondary-foreground
        transition-colors ${className}
      `}
    >
      <Button
        variant={mode === "grid" ? "primary" : "ghost"}
        size="sm"
        onClick={() => onChange("grid")}
        iconLeft={<Grid3x3 className="w-4 h-4" />}
      >
        Grid
      </Button>

      <Button
        variant={mode === "list" ? "primary" : "ghost"}
        size="sm"
        onClick={() => onChange("list")}
        iconLeft={<List className="w-4 h-4" />}
      >
        List
      </Button>
    </div>
  );
}
