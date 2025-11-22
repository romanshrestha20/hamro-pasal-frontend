"use client";

import { MessageSquare, ThumbsUp } from "lucide-react";

interface ReviewActionsProps {
  likes: number;
  likedByUser: boolean;
  onLike: () => void;
  reviewId: string;
  onReply?: () => void;
}

export default function ReviewActions({
  likes,
  likedByUser,
  onLike,
  onReply,
}: ReviewActionsProps) {
  return (
    <div className="flex items-center gap-4 pt-2">
      {/* Like button */}
      <button
        type="button"
        onClick={onLike}
        className={`
          flex items-center gap-1.5 text-sm font-medium
          transition-colors
          ${likedByUser ? "text-blue-600" : "text-gray-600 hover:text-gray-800"}
        `}
        aria-pressed={likedByUser}
        aria-label={
          likedByUser
            ? `Unlike review (${likes} likes)`
            : `Like review (${likes} likes)`
        }
        title={likedByUser ? "Unlike" : "Like"}
      >
        <ThumbsUp
          aria-hidden="true"
          className={`w-4 h-4 ${
            likedByUser ? "fill-blue-600 text-blue-600" : ""
          }`}
        />
        {likes}
      </button>

      {/* Reply button */}
      <button
        type="button"
        onClick={onReply}
        className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        aria-label="Reply to review"
        title="Reply"
      >
        <MessageSquare className="w-4 h-4" />
        Reply
      </button>
    </div>
  );
}
