

import { useEffect, useState } from "react";
import { imageUpload } from "@/lib/api/auth";
import toast from "react-hot-toast";

interface UseProfileImageOptions {
    onSuccess?: (url: string) => void;
    maxFileSize?: number; // in bytes
    allowedTypes?: string[];
}

interface UseProfileImageReturn {
    previewImage: string | null;
    uploading: boolean;
    error: string | null;
    handleFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    resetError: () => void;
}

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5MB
const DEFAULT_ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export const useProfileImage = (
    options: UseProfileImageOptions = {}
): UseProfileImageReturn => {
    const {
        onSuccess,
        maxFileSize = DEFAULT_MAX_SIZE,
        allowedTypes = DEFAULT_ALLOWED_TYPES,
    } = options;

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Cleanup blob URLs on unmount
    useEffect(() => {
        return () => {
            if (previewImage?.startsWith("blob:")) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    const validateFile = (file: File): string | null => {
        // Validate file size
        if (file.size > maxFileSize) {
            const sizeMB = (maxFileSize / (1024 * 1024)).toFixed(1);
            return `File too large. Maximum size is ${sizeMB}MB.`;
        }

        // Validate file type
        if (!allowedTypes.includes(file.type)) {
            const types = allowedTypes.map((t) => t.split("/")[1].toUpperCase()).join(", ");
            return `Invalid format. Please use ${types}.`;
        }

        return null;
    };

    const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);

        // Validate file
        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            toast.error(validationError);
            return;
        }

        // Show local preview immediately
        const blobUrl = URL.createObjectURL(file);
        setPreviewImage(blobUrl);

        try {
            setUploading(true);
            const res = await imageUpload(file);

            // If request failed (non-2xx), show error
            if (!res.success) {
                toast.error("Upload failed. Please try again.");
                setError("Upload failed. Please try again.");
                return;
            }

            // Backend returns an absolute URL at res.data.data.url
            const absoluteUrl: string | undefined = res.data?.data?.url;
            if (absoluteUrl) {
                toast.success("Profile photo updated!");
                setPreviewImage(absoluteUrl);
                onSuccess?.(absoluteUrl);
            } else {
                setError("Upload succeeded, but no image URL was returned.");
                toast.error("Upload succeeded, but no image URL was returned.");
            }
        } catch (err) {
            const errorMessage = "Upload failed. Please try again.";
            setError(errorMessage);
            toast.error(errorMessage);
            console.error("Image upload error:", err);
        } finally {
            setUploading(false);
        }
    };

    const resetError = () => setError(null);

    return {
        previewImage,
        uploading,
        error,
        handleFileSelected,
        resetError,
    };
};
