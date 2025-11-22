"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import type { Review, Reply } from "@/lib/types";

import {
  UpdateReplyInput,
  CreateReviewInput as ReviewCreateInput,
  getProductReviews as apiGetProductReviews,
  getReviewById as apiGetReviewById,
  createProductReview as apiCreateProductReview,
  updateReview as apiUpdateReview,
  deleteReview as apiDeleteReview,
  toggleLikeReview as apiToggleLikeReview,
  addReplyToReview as apiAddReplyToReview,
  getRepliesForReview as apiGetRepliesForReview,
  updateReply as apiUpdateReply,
  deleteReply as apiDeleteReply,
  toggleLikeReply as apiToggleLikeReply,
  LikeReviewResponse,
  LikeReplyResponse,
} from "@/lib/api/product";

import toast from "react-hot-toast";

// Generic typed result
export type ReviewResult<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };

// Context type
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

  handleLikeReview: (reviewId: string) => Promise<LikeReviewResponse>;
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

  handleLikeReply: (replyId: string) => Promise<LikeReplyResponse>;
}

// Initial context
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
  addReplyToReview: async () => ({ success: false, error: "Not implemented" }),
  getRepliesForReview: async () => ({
    success: false,
    error: "Not implemented",
  }),
  updateReply: async () => ({ success: false, error: "Not implemented" }),
  deleteReply: async () => ({ success: false, error: "Not implemented" }),

  handleLikeReview: async () => ({ liked: false, likeCount: 0 }),
  handleLikeReply: async () => ({ liked: false, likeCount: 0 }),
});

export const ReviewProvider = ({ children }: { children: React.ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback(function <T>(
    err: unknown,
    fallback: string
  ): ReviewResult<T> {
    const msg = err instanceof Error ? err.message : fallback;
    setError(msg);
    return { success: false, error: msg };
  }, []);

  /* ------------------------------------------------------
   * FETCH PRODUCT REVIEWS
   * ------------------------------------------------------ */
  const fetchProductReviews = useCallback(
    async (
      productId: string,
      signal?: AbortSignal
    ): Promise<ReviewResult<Review[]>> => {
      setLoading(true);
      try {
        const res = await apiGetProductReviews(productId, { signal });
        if (res.success && Array.isArray(res.data)) {
          setReviews(res.data);
          return { success: true, data: res.data };
        }
        return {
          success: false,
          error: res.error || "Failed to fetch reviews",
        };
      } catch (err) {
        return handleError(err, "Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  /* ------------------------------------------------------
   * SINGLE REVIEW
   * ------------------------------------------------------ */
  const fetchReviewById = useCallback(
    async (
      reviewId: string,
      signal?: AbortSignal
    ): Promise<ReviewResult<Review>> => {
      setLoading(true);
      try {
        const res = await apiGetReviewById(reviewId, { signal });
        if (res.success && res.data) return { success: true, data: res.data };
        return { success: false, error: res.error || "Failed to fetch review" };
      } catch (err) {
        return handleError(err, "Failed to fetch review");
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  /* ------------------------------------------------------
   * CREATE REVIEW
   * ------------------------------------------------------ */
  const addProductReview = useCallback(
    async (
      productId: string,
      reviewData: ReviewCreateInput
    ): Promise<ReviewResult<Review>> => {
      try {
        const res = await apiCreateProductReview(productId, reviewData);
        if (res.success && res.data) {
          const created = res.data as Review;
          setReviews((prev) => [...prev, created]);
          return { success: true, data: created };
        }
        return {
          success: false,
          error: res.error || "Failed to create review",
        };
      } catch (err) {
        return handleError(err, "Failed to create review");
      }
    },
    [handleError]
  );

  /* ------------------------------------------------------
   * UPDATE REVIEW
   * ------------------------------------------------------ */
  const updateReview = React.useCallback(
    async (
      reviewId: string,
      updatedData: Partial<Review>
    ): Promise<ReviewResult<Review>> => {
      try {
        const res = await apiUpdateReview(reviewId, updatedData);
        if (res.success && res.data) {
          const updated = res.data as Review;
          setReviews((prev) =>
            prev.map((r) => (r.id === reviewId ? updated : r))
          );
          return { success: true, data: updated };
        }
        return {
          success: false,
          error: res.error || "Failed to update review",
        };
      } catch (err) {
        return handleError(err, "Failed to update review");
      }
    },
    [handleError]
  );

  /* ------------------------------------------------------
   * DELETE REVIEW
   * ------------------------------------------------------ */
  const deleteReview = React.useCallback(
    async (reviewId: string): Promise<ReviewResult<{ message: string }>> => {
      try {
        const res = await apiDeleteReview(reviewId);
        if (res.success) {
          setReviews((prev) => prev.filter((r) => r.id !== reviewId));
          return {
            success: true,
            data: res.data ?? { message: "Review deleted successfully" },
          };
        }
        return {
          success: false,
          error: res.error || "Failed to delete review",
        };
      } catch (err) {
        return handleError(err, "Failed to delete review");
      }
    },
    [handleError]
  );

  /* ------------------------------------------------------
   * ADD REPLY
   * ------------------------------------------------------ */
  const addReplyToReview = React.useCallback(
    async (
      reviewId: string,
      replyData: { comment: string }
    ): Promise<ReviewResult<Reply>> => {
      try {
        const res = await apiAddReplyToReview(reviewId, replyData);
        if (res.success && res.data) {
          const created = res.data as Reply;
          setReplies((prev) => [...prev, created]);
          return { success: true, data: created };
        }
        return { success: false, error: res.error || "Failed to add reply" };
      } catch (err) {
        return handleError(err, "Failed to add reply");
      }
    },
    [handleError]
  );

  /* ------------------------------------------------------
   * GET REPLIES
   * ------------------------------------------------------ */
  const getRepliesForReview = useCallback(
    async (
      reviewId: string,
      signal?: AbortSignal
    ): Promise<ReviewResult<Reply[]>> => {
      setLoading(true);
      try {
        const res = await apiGetRepliesForReview(reviewId, { signal });
        if (res.success && Array.isArray(res.data)) {
          // Map backend reply likeCount -> frontend likesCount
          type RawReply = Omit<Reply, "likesCount"> & { likeCount: number };
          const mapped: Reply[] = (res.data as unknown as RawReply[]).map(
            (rp) => ({
              ...rp,
              likesCount: rp.likeCount,
            })
          );
          setReplies(mapped);
          return { success: true, data: mapped };
        }
        return {
          success: false,
          error: res.error || "Failed to fetch replies",
        };
      } catch (err) {
        return handleError(err, "Failed to fetch replies");
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  /* ------------------------------------------------------
   * UPDATE REPLY
   * ------------------------------------------------------ */
  const updateReply = React.useCallback(
    async (
      replyId: string,
      updatedData: Partial<UpdateReplyInput>
    ): Promise<ReviewResult<Reply>> => {
      try {
        const res = await apiUpdateReply(replyId, updatedData);
        if (res.success && res.data) {
          const updated = res.data as Reply;
          setReplies((prev) =>
            prev.map((rp) => (rp.id === replyId ? updated : rp))
          );
          return { success: true, data: updated };
        }
        return { success: false, error: res.error || "Failed to update reply" };
      } catch (err) {
        return handleError(err, "Failed to update reply");
      }
    },
    [handleError]
  );

  /* ------------------------------------------------------
   * DELETE REPLY
   * ------------------------------------------------------ */
  const deleteReply = React.useCallback(
    async (replyId: string): Promise<ReviewResult<{ message: string }>> => {
      try {
        const res = await apiDeleteReply(replyId);
        if (res.success) {
          setReplies((prev) => prev.filter((rp) => rp.id !== replyId));
          return {
            success: true,
            data: res.data ?? { message: "Reply deleted successfully" },
          };
        }
        return { success: false, error: res.error || "Failed to delete reply" };
      } catch (err) {
        return handleError(err, "Failed to delete reply");
      }
    },
    [handleError]
  );

  /* ------------------------------------------------------
   * LIKE REVIEW (toggle)
   * ------------------------------------------------------ */
  const handleLikeReview = useCallback(
    async (reviewId: string): Promise<LikeReviewResponse> => {
      try {
        const res = await apiToggleLikeReview(reviewId);
        type LikeReviewApi = {
          success: boolean;
          data?: LikeReviewResponse;
          error?: string;
        };
        const parsed = res as unknown as LikeReviewApi;
        if (parsed.success && parsed.data) {
          const data = parsed.data;
          setReviews((prev) =>
            prev.map((r) =>
              r.id === reviewId
                ? {
                    ...r,
                    likedByUser: data.liked,
                    likesCount: data.likeCount,
                  }
                : r
            )
          );
          return data;
        }
        throw new Error(parsed.error || "Failed to toggle like");
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed to toggle like";
        toast.error(msg);
        return { liked: false, likeCount: 0 };
      }
    },
    []
  );
  /* ------------------------------------------------------
   * LIKE REPLY (toggle)
   * ------------------------------------------------------ */
  const handleLikeReply = useCallback(
    async (replyId: string): Promise<LikeReplyResponse> => {
      try {
        const res = await apiToggleLikeReply(replyId);
        type LikeReplyApi = {
          success: boolean;
          data?: LikeReplyResponse;
          error?: string;
        };
        const parsed = res as unknown as LikeReplyApi;
        if (parsed.success && parsed.data) {
          const data = parsed.data;
          setReplies((prev) =>
            prev.map((rp) =>
              rp.id === replyId
                ? {
                    ...rp,
                    likedByUser: data.liked,
                    likesCount: data.likeCount,
                  }
                : rp
            )
          );
          return data;
        }
        throw new Error(parsed.error || "Failed to toggle reply like");
      } catch (e) {
        const msg =
          e instanceof Error ? e.message : "Failed to toggle reply like";
        toast.error(msg);
        return { liked: false, likeCount: 0 };
      }
    },
    []
  );
  /* ------------------------------------------------------
   * PROVIDER
   * ------------------------------------------------------ */
  const value = useMemo(
    () => ({
      reviews,
      replies,
      loading,
      error,
      fetchProductReviews,
      fetchReviewById,
      addProductReview,
      updateReview,
      deleteReview,
      addReplyToReview,
      getRepliesForReview,
      updateReply,
      deleteReply,
      handleLikeReview,
      handleLikeReply,
    }),
    [
      reviews,
      replies,
      loading,
      error,
      fetchProductReviews,
      fetchReviewById,
      addProductReview,
      updateReview,
      deleteReview,

      addReplyToReview,
      getRepliesForReview,
      updateReply,
      deleteReply,
      handleLikeReview,
      handleLikeReply,
    ]
  );

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
};

export const useReviewContext = () => useContext(ReviewContext);
