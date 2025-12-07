"use client";

import { useImageContext } from "../context/ImageProvider";
import { useImagePreview } from "./useImagePreview";
import { useImageUpload } from "./useImageUpload";
import { useAuth } from "./useAuth";
import toast from "react-hot-toast";

export const useUserProfileImage = ({
    onSuccess,
    onRemove,
}: {
    onSuccess?: (url: string) => void;
    onRemove?: () => void;
} = {}) => {
    const { uploadUserImage, removeUserImage, uploading, error, image } =
        useImageContext();
    const { user } = useAuth();

    const { previewUrl, loadPreview, clearPreview } = useImagePreview();
    const { validate } = useImageUpload();

    const handleFileSelected = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!validate(file)) return;

        loadPreview(file);

        const uploaded = await uploadUserImage(file);
        if (!uploaded) return toast.error("Image upload failed");

        const url = uploaded.fullUrl ?? uploaded.url;
        onSuccess?.(url);
        console.log("Uploaded profile image URL:", url);
    };

    const handleRemove = async () => {
        const ok = await removeUserImage();
        if (ok) {
            clearPreview();
            onRemove?.();
        }
    };

    return {
        previewUrl,
        uploading,
        error,
        handleFileSelected,
        handleRemove,
        image,
    };
};
