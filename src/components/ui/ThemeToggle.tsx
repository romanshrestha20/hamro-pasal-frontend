"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "./Button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent server/client mismatch
  if (!mounted) {
    return (
      <button
        aria-label="Toggle Theme"
        className="p-2 transition rounded-xl text-foreground bg-muted"
      />
    );
  }

  const theme =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";

  return (
    <button
      onClick={() => {
        document.documentElement.classList.toggle("dark");
      }}
      aria-label="Toggle Theme"
      className="p-2 transition rounded-xl hover:bg-muted text-foreground active:scale-[.96]"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 transition-transform duration-300 scale-100 rotate-0" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 scale-75 rotate-90" />
      )}
    </button>
  );
}
