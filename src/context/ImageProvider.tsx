"use client";

import type { Image } from "@/lib/types";
import { createContext, useContext, useState, ReactNode } from "react";
import { uploadUserImage, deleteUserImage } from "@/lib/api/userImage.api";
import toast from "react-hot-toast";

interface ImageContextValue {
  uploading: boolean;
  error: string | null;
  image: Image | null;

  uploadUserImage: (file: File) => Promise<Image | null>;
  removeUserImage: () => Promise<boolean>;
}

// Helper functions for API calls
const ImageContext = createContext<ImageContextValue>(null!);

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [image, setImage] = useState<Image | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const res = await uploadUserImage(file);
    setUploading(false);

    if (!res.success || !res.data) {
      const message = res.error || "Upload failed";
      setError(message);
      toast.error(message);
      return null;
    }

    setImage(res.data);
    toast.success("Image uploaded successfully");
    return res.data;
  };

  const handleRemove = async () => {
    setUploading(true);
    const res = await deleteUserImage();
    setUploading(false);

    if (!res.success) {
      toast.error(res.error || "Failed to delete image");
      return false;
    }

    setImage(null);
    toast.success("Image removed successfully");
    return true;
  };

  return (
    <ImageContext.Provider
      value={{
        image,
        uploading,
        error,
        uploadUserImage: handleUpload,
        removeUserImage: handleRemove,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => useContext(ImageContext);
