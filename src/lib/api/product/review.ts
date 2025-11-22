import { type ApiResponse } from "@/lib/api/api";
import { apiRequest } from "@/lib/api/index";
import type { Review, Reply } from "@/lib/types/Review";

// Request options type for optional abort signal and query params
type RequestOptions = { signal?: AbortSignal; params?: Record<string, unknown> };
const withConfig = (options?: RequestOptions) =>
    options ? { signal: options.signal, params: options.params } : undefined;

// Payload types
export interface CreateReviewInput {
    rating: number;
    title: string;
    comment: string;
    images?: string[];
}
export type UpdateReviewInput = Partial<CreateReviewInput>;
export interface CreateReplyInput { comment: string; }
export type UpdateReplyInput = Partial<CreateReplyInput>;

// Like response shapes (backend may also supply a liked flag)
export interface LikeReviewResponse {
    likeCount: number;
    liked: boolean;
}
export interface LikeReplyResponse {
    likeCount: number;
    liked: boolean;
}

// Reviews
export const getProductReviews = (
    productId: string,
    options?: RequestOptions
): Promise<ApiResponse<Review[]>> =>
    apiRequest<Review[]>("get", `/reviews/product/${productId}`, undefined, withConfig(options));

export const createProductReview = (
    productId: string,
    reviewData: CreateReviewInput,
    options?: RequestOptions
): Promise<ApiResponse<Review>> =>
    apiRequest<Review>(
        "post",
        `/reviews/`,
        { ...reviewData, productId },
        withConfig(options)
    );

export const getReviewById = (
    reviewId: string,
    options?: RequestOptions
): Promise<ApiResponse<Review>> =>
    apiRequest<Review>("get", `/reviews/id/${reviewId}`, undefined, withConfig(options));

export const updateReview = (
    reviewId: string,
    updated: UpdateReviewInput,
    options?: RequestOptions
): Promise<ApiResponse<Review>> =>
    apiRequest<Review>("put", `/reviews/${reviewId}`, updated, withConfig(options));

export const deleteReview = (
    reviewId: string,
    options?: RequestOptions
): Promise<ApiResponse<{ message: string }>> =>
    apiRequest<{ message: string }>("delete", `/reviews/${reviewId}`, undefined, withConfig(options));

export const toggleLikeReview = (
    reviewId: string,
    options?: RequestOptions
): Promise<ApiResponse<LikeReviewResponse>> =>
    apiRequest<LikeReviewResponse>(
        "post",
        `/reviews/${reviewId}/like-toggle`,
        undefined,
        withConfig(options)
    );

// Replies
export const addReplyToReview = (
    reviewId: string,
    replyData: CreateReplyInput,
    options?: RequestOptions
): Promise<ApiResponse<Reply>> =>
    apiRequest<Reply>("post", `/reviews/${reviewId}/replies`, replyData, withConfig(options));

export const getRepliesForReview = (
    reviewId: string,
    options?: RequestOptions
): Promise<ApiResponse<Reply[]>> =>
    apiRequest<Reply[]>("get", `/reviews/${reviewId}/replies`, undefined, withConfig(options));

export const updateReply = (
    replyId: string,
    updated: UpdateReplyInput,
    options?: RequestOptions
): Promise<ApiResponse<Reply>> =>
    apiRequest<Reply>("put", `/reviews/replies/${replyId}`, updated, withConfig(options));

export const deleteReply = (
    replyId: string,
    options?: RequestOptions
): Promise<ApiResponse<{ message: string }>> =>
    apiRequest<{ message: string }>("delete", `/reviews/replies/${replyId}`, undefined, withConfig(options));

export const toggleLikeReply = (
    replyId: string,
    options?: RequestOptions
): Promise<ApiResponse<LikeReplyResponse>> =>
    apiRequest<LikeReplyResponse>(
        "post",
        `/reviews/replies/${replyId}/like-toggle`,
        undefined,
        withConfig(options)
    );  