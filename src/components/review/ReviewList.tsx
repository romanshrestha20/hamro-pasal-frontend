"use client";

import { useReviewContext } from "@/context/ReviewContext";
import { useEffect } from "react";
import ReviewActions from "./ReviewActions";
import { AvatarWithName } from "./Avatar";

interface ReviewListProps {
  productId?: string;
  onLike?: (reviewId: string) => void;
  onReply?: (reviewId: string) => void;
}

export default function ReviewList({
  productId,
  onLike,
  onReply,
}: ReviewListProps) {
  const {
    reviews,
    loading,
    error,
    likeReview,
    unlikeReview,
    fetchProductReviews,
  } = useReviewContext();

  const handleLikeReview = async (reviewId: string, likedByUser?: boolean) => {
    if (onLike) return onLike(reviewId);
    if (likedByUser) await unlikeReview(reviewId);
    else await likeReview(reviewId);
  };

  useEffect(() => {
    if (productId) {
      void fetchProductReviews(productId);
    }
  }, [productId, fetchProductReviews]);

  if (loading)
    return <div className="py-6 text-gray-600">Loading reviews…</div>;
  if (error)
    return (
      <div className="py-4 text-red-600">Error loading reviews: {error}</div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Reviews</h2>
        <p className="text-sm text-gray-500">What other customers are saying</p>
      </div>

      {/* Empty State */}
      {reviews.length === 0 ? (
        <p className="italic text-gray-500">No reviews yet. Be the first!</p>
      ) : (
        <ul className="space-y-5">
          {reviews.map((review) => {
            const user = review.user;
            const displayName =
              user?.firstName || user?.lastName
                ? [user?.firstName, user?.lastName].filter(Boolean).join(" ")
                : "Anonymous";
            return (
              <li
                key={review.id}
                className="p-5 space-y-3 transition bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
              >
                {/* User Header */}
                <div className="flex items-center gap-3">
                  {/* Avatar + Name inline */}
                  <AvatarWithName user={user} />

                  <div className="flex flex-col leading-tight">
                    <span className="font-semibold">{displayName}</span>

                    <span className="text-xs text-gray-500">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleString()
                        : ""}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold tracking-tight">
                  {review.title}
                </h3>

                {/* Comment */}
                <p className="leading-relaxed text-gray-700">
                  {review.comment}
                </p>

                {/* Rating */}
                <p className="text-sm font-medium text-gray-600">
                  ⭐ Rating: {review.rating} / 5
                </p>

                {/* Actions */}
                <ReviewActions
                  reviewId={review.id}
                  likes={review.likesCount}
                  likedByUser={!!review.likedByUser}
                  onLike={() =>
                    handleLikeReview(review.id, !!review.likedByUser)
                  }
                  onReply={() => onReply?.(review.id)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
