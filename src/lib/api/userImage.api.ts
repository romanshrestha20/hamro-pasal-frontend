// frontend/src/lib/api/images.ts
import { apiRequest } from "@/lib/api/index";
import type { ApiResponse } from "./api";
import type { Image } from "../types/Image.type";

export const uploadUserImage = (
    file: File,
): Promise<ApiResponse<Image>> => {
    const formData = new FormData();
    formData.append("image", file);

    return apiRequest<Image>("post", "/users/upload", formData,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
}

export const deleteUserImage = () =>
    apiRequest<null>(
        "delete",
        "/users/image",
    );

