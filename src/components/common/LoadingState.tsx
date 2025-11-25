"use client";

interface LoadingStateProps {
  label?: string;
  className?: string;
}

export default function LoadingState({
  label = "Loading...",
  className = "",
}: LoadingStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-10 ${className}`}>
      <div className="w-10 h-10 border-2 rounded-full border-primary border-b-transparent animate-spin" />
      <p className="mt-4 text-muted-foreground">{label}</p>
    </div>
  );
}
