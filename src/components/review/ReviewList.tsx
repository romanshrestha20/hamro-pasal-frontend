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
  const { reviews, loading, error, fetchProductReviews, handleLikeReview } =
    useReviewContext();

  useEffect(() => {
    if (productId) void fetchProductReviews(productId);
  }, [productId, fetchProductReviews]);

  const onLikeClick = async (reviewId: string) => {
    if (onLike) return onLike(reviewId);
    await handleLikeReview(reviewId); // internal toggle
  };

  if (loading)
    return <div className="py-6 text-gray-600">Loading reviews…</div>;
  if (error)
    return (
      <div className="py-4 text-red-600">Error loading reviews: {error}</div>
    );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Reviews</h2>
        <p className="text-sm text-gray-500">What other customers are saying</p>
      </div>

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
                <div className="flex items-center gap-3">
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
                <h3 className="text-lg font-semibold tracking-tight text-gray-800">
                  {review.title}
                </h3>
                <p className="leading-relaxed text-gray-700">
                  {review.comment}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  ⭐ Rating: {review.rating} / 5
                </p>
                <ReviewActions
                  reviewId={review.id}
                  likes={review.likesCount}
                  likedByUser={!!review.likedByUser}
                  onLike={() => onLikeClick(review.id)}
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
