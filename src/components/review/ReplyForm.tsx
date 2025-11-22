"use client";

import { useReviewContext } from "@/context/ReviewContext";
import { Input } from "../ui";
import { useState } from "react";

interface ReplyFormProps {
  reviewId: string;
  message?: string;
  onSuccess?: () => void; // optional callback if parent wants to refetch/re-render
}

export default function ReplyForm({ reviewId, message, onSuccess }: ReplyFormProps) {
  const { error, loading, addReplyToReview } = useReviewContext();
  const [text, setText] = useState(message || "");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!text.trim()) {
      setLocalError("Reply cannot be empty.");
      return;
    }

    const result = await addReplyToReview(reviewId, { comment: text.trim() });

    if (!result.success) {
      setLocalError(result.error);
      return;
    }

    // Clear input after success
    setText("");

    // Notify parent if needed
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        label="Your Reply"
        name="message"
        type="text"
        placeholder="Write your reply..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading || !text.trim()}
        className="px-3 py-2 text-white rounded bg-primary disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Reply"}
      </button>

      {(localError || error) && (
        <p className="text-sm text-red-500">{localError || error}</p>
      )}
    </form>
  );
}
