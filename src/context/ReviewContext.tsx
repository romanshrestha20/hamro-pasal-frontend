"use client";

import React, { createContext, useContext, useState } from "react";
import type { Review, Reply } from "@/lib/types";
import {
  UpdateReplyInput,
  CreateReviewInput as ReviewCreateInput,
  getProductReviews as apiGetProductReviews,
  getReviewById as apiGetReviewById,
  createProductReview as apiCreateProductReview,
  updateReview as apiUpdateReview,
  deleteReview as apiDeleteReview,
  likeReview as apiLikeReview,
  unlikeReview as apiUnlikeReview,
  addReplyToReview as apiAddReplyToReview,
  getRepliesForReview as apiGetRepliesForReview,
  updateReply as apiUpdateReply,
  deleteReply as apiDeleteReply,
  likeReply as apiLikeReply,
  unlikeReply as apiUnlikeReply,
  LikeReplyResponse,
  LikeReviewResponse,
} from "@/lib/api/product";

// Define a typed result for review and reply actions
export type ReviewResult<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };

// Define the context type with state and actions for reviews and replies
export interface ReviewContextType {
  reviews: Review[];
  replies: Reply[];
  loading: boolean;
  error: string | null;
  fetchProductReviews: (
    productId: string,
    signal?: AbortSignal
  ) => Promise<ReviewResult<Review[]>>;
  fetchReviewById: (
    reviewId: string,
    signal?: AbortSignal
  ) => Promise<ReviewResult<Review>>;
  addProductReview: (
    productId: string,
    reviewData: ReviewCreateInput
  ) => Promise<ReviewResult<Review>>;
  updateReview: (
    reviewId: string,
    updatedData: Partial<Review>
  ) => Promise<ReviewResult<Review>>;
  deleteReview: (
    reviewId: string
  ) => Promise<ReviewResult<{ message: string }>>;
  likeReview: (reviewId: string) => Promise<ReviewResult<LikeReviewResponse>>;
  unlikeReview: (reviewId: string) => Promise<ReviewResult<LikeReviewResponse>>;
  addReplyToReview: (
    reviewId: string,
    replyData: { comment: string }
  ) => Promise<ReviewResult<Reply>>;
  getRepliesForReview: (
    reviewId: string,
    signal?: AbortSignal
  ) => Promise<ReviewResult<Reply[]>>;
  updateReply: (
    replyId: string,
    updatedData: Partial<UpdateReplyInput>
  ) => Promise<ReviewResult<Reply>>;
  deleteReply: (replyId: string) => Promise<ReviewResult<{ message: string }>>;
  likeReply: (replyId: string) => Promise<ReviewResult<LikeReplyResponse>>;
  unlikeReply: (replyId: string) => Promise<ReviewResult<LikeReplyResponse>>;
}

// Create the ReviewContext with default values to ensure type safety
export const ReviewContext = createContext<ReviewContextType>({
  reviews: [],
  replies: [],
  loading: true,
  error: null,
  fetchProductReviews: async () => ({
    success: false,
    error: "Not implemented",
  }),
  fetchReviewById: async () => ({ success: false, error: "Not implemented" }),
  addProductReview: async () => ({ success: false, error: "Not implemented" }),
  updateReview: async () => ({ success: false, error: "Not implemented" }),
  deleteReview: async () => ({ success: false, error: "Not implemented" }),
  likeReview: async () => ({ success: false, error: "Not implemented" }),
  unlikeReview: async () => ({ success: false, error: "Not implemented" }),
  addReplyToReview: async () => ({ success: false, error: "Not implemented" }),
  getRepliesForReview: async () => ({
    success: false,
    error: "Not implemented",
  }),
  updateReply: async () => ({ success: false, error: "Not implemented" }),
  deleteReply: async () => ({ success: false, error: "Not implemented" }),
  likeReply: async () => ({ success: false, error: "Not implemented" }),
  unlikeReply: async () => ({ success: false, error: "Not implemented" }),
});

export const ReviewProvider = ({ children }: { children: React.ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function handleError<T>(err: unknown, fallback: string): ReviewResult<T> {
    const msg = err instanceof Error ? err.message : fallback;
    setError(msg);
    return { success: false, error: msg };
  }

  const fetchProductReviews = async (
    productId: string,
    signal?: AbortSignal
  ): Promise<ReviewResult<Review[]>> => {
    setLoading(true);
    try {
      const response = await apiGetProductReviews(productId, { signal });
      if (response.success && Array.isArray(response.data)) {
        setReviews(response.data);
        return {
          success: true,
          data: response.data,
        };
      }
      return {
        success: false,
        error: response.error || "Failed to fetch product reviews",
      };
    } catch (err) {
      return handleError(err, "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewById = async (
    reviewId: string,
    signal?: AbortSignal
  ): Promise<ReviewResult<Review>> => {
    try {
      const response = await apiGetReviewById(reviewId, { signal });
      if (response.success && response.data)
        return { success: true, data: response.data };
      return {
        success: false,
        error: response.error || "Failed to fetch product",
      };
    } catch (err) {
      return handleError(err, "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const addProductReview = async (
    productId: string,
    reviewData: ReviewCreateInput
  ): Promise<ReviewResult<Review>> => {
    try {
      const response = await apiCreateProductReview(productId, reviewData);
      if (response.success && response.data) {
        // Optionally update local state
        setReviews((prevReviews) => [...prevReviews, response.data as Review]);
        return { success: true, data: response.data };
      }
      return {
        success: false,
        error: response.error || "Failed to create product review",
      };
    } catch (err) {
      return handleError(err, "An unknown error occurred");
    }
  };
  const updateReview = async (
    reviewId: string,
    updatedData: Partial<Review>
  ): Promise<ReviewResult<Review>> => {
    try {
      const response = await apiUpdateReview(reviewId, updatedData);
      if (response.success && response.data) {
        // Optionally update local state
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === reviewId ? (response.data as Review) : review
          )
        );
        return { success: true, data: response.data };
      }
      return {
        success: false,
        error: response.error || "Failed to update product review",
      };
    } catch (err) {
      return handleError(err, "An unknown error occurred");
    }
  };

  const deleteReview = async (
    reviewId: string
  ): Promise<ReviewResult<{ message: string }>> => {
    try {
      const response = await apiDeleteReview(reviewId);
      if (response.success && response.data) {
        // Optionally update local state
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review.id !== reviewId)
        );
        return { success: true, data: response.data };
      }
      return {
        success: false,
        error: response.error || "Failed to delete product review",
      };
    } catch (err) {
      return handleError(
        err,
        "An unknown error occurred while deleting review"
      );
    }
  };
  const likeReview = async (
    reviewId: string
  ): Promise<ReviewResult<LikeReviewResponse>> => {
    try {
      const response = await apiLikeReview(reviewId);

      if (!response.success || !response.data) {
        return {
          success: false,
          error: response.error || "Failed to like review",
        };
      }

      return { success: true, data: response.data };
    } catch (err) {
      return handleError(err, "An unknown error occurred while liking review");
    }
  };

  const unlikeReview = async (
    reviewId: string
  ): Promise<ReviewResult<LikeReviewResponse>> => {
    try {
      const response = await apiUnlikeReview(reviewId);

      if (!response.success || !response.data) {
        return {
          success: false,
          error: response.error || "Failed to like review",
        };
      }

      return { success: true, data: response.data };
    } catch (err) {
      return handleError(err, "An unknown error occurred while liking review");
    }
  };

  const addReplyToReview = async (
    reviewId: string,
    replyData: { comment: string }
  ): Promise<ReviewResult<Reply>> => {
    try {
      const response = await apiAddReplyToReview(reviewId, replyData);
      if (response.success && response.data) {
        setReplies((prevReplies) => [...prevReplies, response.data as Reply]);
        return { success: true, data: response.data };
      }
      return {
        success: false,
        error: response.error || "Failed to add reply to review",
      };
    } catch (err) {
      return handleError(
        err,
        "An unknown error occurred while adding reply to review"
      );
    }
  };
  const getRepliesForReview = async (
    reviewId: string,
    signal?: AbortSignal
  ): Promise<ReviewResult<Reply[]>> => {
    setLoading(true);
    try {
      const response = await apiGetRepliesForReview(reviewId, { signal });
      if (response.success && Array.isArray(response.data)) {
        setReplies(response.data);
        return {
          success: true,
          data: response.data,
        };
      }
      return {
        success: false,
        error: response.error || "Failed to fetch review replies",
      };
    } catch (err) {
      return handleError(
        err,
        "An unknown error occurred while fetching review replies"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateReply = async (
    replyId: string,
    updatedData: Partial<UpdateReplyInput>
  ): Promise<ReviewResult<Reply>> => {
    try {
      const response = await apiUpdateReply(replyId, updatedData);
      if (response.success && response.data) {
        setReplies((prevReplies) => {
          return prevReplies.map((reply) =>
            reply.id === replyId ? (response.data as Reply) : reply
          );
        });
        return { success: true, data: response.data };
      }
      return {
        success: false,
        error: response.error || "Failed to update reply",
      };
    } catch (err) {
      return handleError(err, "An unknown error occurred while updating reply");
    }
  };

  const deleteReply = async (
    replyId: string
  ): Promise<ReviewResult<{ message: string }>> => {
    try {
      const response = await apiDeleteReply(replyId);
      if (response.success && response.data) {
        setReplies((prevReplies) =>
          prevReplies.filter((reply) => reply.id !== replyId)
        );
        return { success: true, data: response.data };
      }
      return {
        success: false,
        error: response.error || "Failed to delete reply",
      };
    } catch (err) {
      return handleError(err, "An unknown error occurred while deleting reply");
    }
  };
  const likeReply = async (
    replyId: string
  ): Promise<ReviewResult<LikeReplyResponse>> => {
    try {
      const response = await apiLikeReply(replyId);

      if (!response.success || !response.data) {
        return {
          success: false,
          error: response.error || "Failed to like reply",
        };
      }

      return { success: true, data: response.data };
    } catch (err) {
      return handleError(err, "An unknown error occurred while liking reply");
    }
  };

  const unlikeReply = async (
    replyId: string
  ): Promise<ReviewResult<LikeReplyResponse>> => {
    try {
      const response = await apiUnlikeReply(replyId);

      if (!response.success || !response.data) {
        return {
          success: false,
          error: response.error || "Failed to unlike reply",
        };
      }

      return { success: true, data: response.data };
    } catch (err) {
      return handleError(err, "An unknown error occurred while unliking reply");
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        replies,
        loading,
        error,
        fetchProductReviews,
        fetchReviewById,
        addProductReview,
        updateReview,
        deleteReview,
        likeReview,
        unlikeReview,
        addReplyToReview,
        getRepliesForReview,
        updateReply,
        deleteReply,
        likeReply,
        unlikeReply,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewContext = () => useContext(ReviewContext);
