"use client";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils"; // if you use a cn helper

export const ProfileImageUploader = ({
  uploading,
  error,
  onSelect,
  onRemove,
}: {
  uploading: boolean;
  error?: string | null;
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}) => {
  const disabled = uploading;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {/* Change Photo Button */}
        <label
          className={cn(
            "px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm cursor-pointer",
            "transition-colors duration-150 hover:bg-primary/90",
            disabled && "opacity-50 cursor-not-allowed hover:bg-primary"
          )}
        >
          <input
            type="file"
            hidden
            onChange={onSelect}
            disabled={disabled}
            accept="image/*"
          />
          {uploading ? "Uploading..." : "Change Photo"}
        </label>

        {/* Remove Photo Button */}

        <Button
          variant="outline"
          className="text-error"
          onClick={onRemove}
          disabled={disabled}
        >
          Remove
        </Button>
      </div>

      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
};
