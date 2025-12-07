import { useState } from "react";

export const useImagePreview = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const loadPreview = (file: File) => {
    const blob = URL.createObjectURL(file);
    setPreviewUrl(blob);
  };

  const clearPreview = () => setPreviewUrl(null);

  return { previewUrl, loadPreview, clearPreview };
};
