"use client";

import Header from "../ui/Header";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const AuthLayout = ({
  title,
  subtitle,
  children,
  className = "",
}: AuthLayoutProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 transition-colors bg-background">
      <div
        className={`
          w-full max-w-md 
          bg-card text-card-foreground
          border border-border
          shadow-lg rounded-2xl 
          p-8
          backdrop-blur-sm
          transition-colors
          ${className}
        `}
      >
        {/* Header */}
        <Header title={title} subtitle={subtitle} />
        {children}
      </div>
    </div>
  );
};
