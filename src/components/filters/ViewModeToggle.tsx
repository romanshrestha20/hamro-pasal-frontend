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
      className={`flex gap-2 px-1 rounded-lg bg-secondary text-card-foreground border border-border ${className}`}
    >
      <Button
        className={
          mode === "grid"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground"
        }
        onClick={() => onChange("grid")}
      >
        <Grid3x3 className="w-4 h-4" /> Grid
      </Button>

      <Button
        className={
          mode === "list"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground"
        }
        onClick={() => onChange("list")}
      >
        <List className="w-4 h-4" /> List
      </Button>
    </div>
  );
}
