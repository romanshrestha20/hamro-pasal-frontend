"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReviewContext } from "@/context/ReviewContext";
import { Button, Input, TextArea } from "../ui";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

interface ReviewFormProps {
  productId: string;
  message?: string;
  onSuccess?: () => void; // optional callback for refreshing parent UI
}

export default function ReviewForm({
  productId,
  message,
  onSuccess,
}: ReviewFormProps) {
  const { user: authUser, isAuthenticated } = useAuth();
  const {
    addProductReview,
    error: globalError,
    loading,
    reviews,
  } = useReviewContext();
  const hasShownDuplicateToast = useRef(false);

  const [formData, setFormData] = useState({
    title: "",
    rating: 5,
    comment: message || "",
  });

  const [localError, setLocalError] = useState<string | null>(null);

  // Determine if this user already has a review for this product
  const hasReviewed = useMemo(() => {
    if (!isAuthenticated || !authUser) return false;
    return reviews.some((r) => {
      const prodId = (r as unknown as { productId?: string }).productId;
      return r.user?.id === authUser.id && prodId === productId;
    });
  }, [isAuthenticated, authUser, reviews, productId]);

  // Toast on mount if already reviewed (one-time)
  useEffect(() => {
    if (hasReviewed && !hasShownDuplicateToast.current) {
      toast("You have already reviewed this product.");
      hasShownDuplicateToast.current = true;
    }
  }, [hasReviewed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    toast.dismiss();

    if (hasReviewed) {
      toast("You have already reviewed this product.");
      return;
    }

    // basic validation
    if (!formData.title.trim()) {
      setLocalError("Title is required.");
      return;
    }

    if (formData.rating < 1 || formData.rating > 5) {
      setLocalError("Rating must be between 1 and 5.");
      return;
    }

    if (!formData.comment.trim()) {
      setLocalError("Comment cannot be empty.");
      return;
    }

    const result = await addProductReview(productId, {
      rating: formData.rating,
      title: formData.title.trim(),
      comment: formData.comment.trim(),
      images: [],
    });

    if (!result.success) {
      setLocalError(result.error);
      return;
    }

    // Reset fields on success
    setFormData({ title: "", rating: 5, comment: "" });

    toast.success("Review submitted!");
    // Callback if parent needs to refetch
    onSuccess?.();
  };

  if (!isAuthenticated) {
    return (
      <div className="p-4 mt-4 text-sm text-gray-600 border rounded-lg bg-white/60 dark:bg-neutral-800/60">
        Please log in to write a review.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-4 bg-white border rounded-lg dark:bg-neutral-900 dark:border-neutral-700"
      aria-describedby={localError || globalError ? "review-error" : undefined}
    >
      <h3 className="text-lg font-medium">Write a Review</h3>

      {(localError || globalError) && (
        <div
          id="review-error"
          className="p-2 text-sm text-red-700 bg-red-100 border border-red-400 rounded"
          role="alert"
          aria-live="polite"
        >
          {localError || globalError}
        </div>
      )}

      <Input
        type="text"
        label="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
        placeholder="Great product!"
      />

      <Input
        type="number"
        label="Rating (1-5)"
        value={formData.rating}
        onChange={(e) =>
          setFormData({
            ...formData,
            rating: Math.min(5, Math.max(1, Number(e.target.value))),
          })
        }
        min={1}
        max={5}
        required
      />

      <TextArea
        label="Comment"
        value={formData.comment}
        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
        required
        placeholder="Share your experience..."
      />

      <Button
        type="submit"
        disabled={
          loading ||
          hasReviewed ||
          !formData.title.trim() ||
          !formData.comment.trim() ||
          formData.rating < 1 ||
          formData.rating > 5
        }
      >
        {hasReviewed
          ? "Already Reviewed"
          : loading
            ? "Submitting..."
            : "Submit Review"}
      </Button>
    </form>
  );
}
