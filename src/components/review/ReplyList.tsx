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
  const { reviews, loading, error, handleLikeReply, fetchProductReviews } =
    useReviewContext();

  const onLikeClick = async (reviewId: string, likedByUser?: boolean) => {
    if (onLike) return onLike(reviewId);
    if (likedByUser) await handleLikeReply(reviewId);
    else await handleLikeReply(reviewId);
  };

  useEffect(() => {
    if (productId) void fetchProductReviews(productId);
  }, [productId, fetchProductReviews]);

  if (loading)
    return <div className="py-6 text-gray-600">Loading reviews…</div>;
  if (error)
    return <div className="py-4 text-red-600">Error loading reviews: {error}</div>;

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
          {reviews.map((review) => (
            <li
              key={review.id}
              className="p-5 space-y-4 transition bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
            >
              {/* User Row */}
              <div className="flex items-center gap-3">
                <AvatarWithName user={review.user} />

                <div className="flex flex-col leading-tight">
                  {/* Full Name (Only once!) */}
                  <span className="font-semibold">
                    {review.user.firstName} {review.user.lastName}
                  </span>

                  {/* Date */}
                  <span className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold tracking-tight">
                {review.title}
              </h3>

              {/* Comment */}
              <p className="leading-relaxed text-gray-700">{review.comment}</p>

              {/* Rating */}
              <p className="text-sm font-medium text-gray-700">
                ⭐ Rating: {review.rating} / 5
              </p>

              {/* Actions */}
              <ReviewActions
                reviewId={review.id}
                likes={review.likesCount}
                likedByUser={!!review.likedByUser}
                onLike={() => onLikeClick(review.id, !!review.likedByUser)}
                onReply={() => onReply?.(review.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
