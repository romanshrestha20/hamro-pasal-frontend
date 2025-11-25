"use client";

interface ErrorStateProps {
  message?: string;
  subMessage?: string;
  className?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = "Something went wrong",
  subMessage,
  className = "",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className={`py-16 text-center ${className}`}>
      <p className="text-lg font-semibold text-error">{message}</p>

      {subMessage && (
        <p className="mt-1 text-sm text-muted-foreground">{subMessage}</p>
      )}

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 mt-4 text-sm transition-colors rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Retry
        </button>
      )}
    </div>
  );
}
