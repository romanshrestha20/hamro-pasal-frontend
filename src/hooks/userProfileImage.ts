"use client";

import { useState } from "react";
import { useImageContext } from "@/context/ImageProvider";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

interface UseProfileImageOptions {
    onSuccess?: (url: string) => void;
    onRemove?: () => void;
    maxFileSize?: number;
    allowedTypes?: string[];
}

interface UseProfileImageReturn {
    previewImage: string | null;
    uploading: boolean;
    error: string | null;
    handleFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    removeProfileImage: () => Promise<void>;
    resetError: () => void;
}

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const DEFAULT_ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export const useProfileImage = ({
    onSuccess,
    onRemove,
    maxFileSize = DEFAULT_MAX_SIZE,
    allowedTypes = DEFAULT_ALLOWED_TYPES,
}: UseProfileImageOptions): UseProfileImageReturn => {

    const {
        uploading,
        error,
        uploadUserImage,
        removeUserImage
    } = useImageContext();

    const { user } = useAuth();

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const resetError = () => {
        // future: clear internal errors if needed
    };

    // -------------------------------
    // HANDLE FILE SELECTION
    // -------------------------------
    const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

    // Validate size
        if (file.size > maxFileSize) {
            toast.error("File is too large");
            return;
        }

        // Validate type
        if (!allowedTypes.includes(file.type)) {
            toast.error("Invalid file type");
            return;
        }

        // Preview UI
        const localPreview = URL.createObjectURL(file);
        setPreviewImage(localPreview);

        // Upload to backend
        const uploaded = await uploadUserImage(file);

        if (!uploaded) {
            toast.error("Image upload failed");
            return;
        }

        // optional callback
        if (onSuccess) {
            const absoluteUrl = uploaded.url;
            onSuccess(absoluteUrl);
        }
    };

    // -------------------------------
    // REMOVE PROFILE IMAGE
    // -------------------------------
    const handleDeleteProfileImage = async () => {
        if (!user?.id) {
            toast.error("User not authenticated");
            return;
        }

        const ok = await removeUserImage();

        if (ok) {
            setPreviewImage(null); // remove preview
            onRemove?.();
        }
    };

    return {
        previewImage,
        uploading,
        error,
        handleFileSelected,
        removeProfileImage: handleDeleteProfileImage,
        resetError,
    };
};
