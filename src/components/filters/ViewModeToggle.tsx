"use client";

import { Grid3x3, List } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  mode: "grid" | "list";
  onChange: (mode: "grid" | "list") => void;
}

export default function ViewModeToggle({ mode, onChange }: Props) {
  return (
    <div className="flex gap-2 p-1 border rounded-lg bg-soft-lavender-200 dark:bg-gray-800">
      <Button
        className={mode === "grid" ? "bg-bright-blue-500 text-white" : ""}
        onClick={() => onChange("grid")}
      >
        <Grid3x3 className="w-4 h-4" /> Grid
      </Button>

      <Button
        className={mode === "list" ? "bg-bright-blue-500 text-white" : ""}
        onClick={() => onChange("list")}
      >
        <List className="w-4 h-4" /> List
      </Button>
    </div>
  );
}
