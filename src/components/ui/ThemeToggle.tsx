"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className="p-2 transition-all duration-300 rounded-lg hover:bg-muted text-card-foreground"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 transition-transform duration-300 scale-100 rotate-0" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 scale-75 rotate-90" />
      )}
    </Button>
  );
}
