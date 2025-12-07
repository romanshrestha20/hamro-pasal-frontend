"use client";

import { Button } from "@/components/ui";

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
  return (
    <div className="flex items-center gap-2">
      <label
        className={`px-3 py-1.5 rounded bg-primary text-white cursor-pointer ${
          uploading && "opacity-50 cursor-not-allowed"
        }`}
      >
        <input type="file" hidden onChange={onSelect} disabled={uploading} />
        {uploading ? "Uploading..." : "Change Photo"}
      </label>

      <Button variant="secondary" onClick={onRemove} disabled={uploading}>
        Remove
      </Button>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
