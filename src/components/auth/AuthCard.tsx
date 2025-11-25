"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuthCardProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  footer?: ReactNode;
  className?: string;
}

export function AuthCard({
  children,
  title,
  subtitle,
  footer,
  className = "",
}: AuthCardProps) {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 transition-colors bg-background">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`
          bg-card text-card-foreground
          p-8 rounded-2xl shadow-lg
          w-full max-w-md
          border border-border
          backdrop-blur-sm
          ${className}
        `}
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-semibold">{title}</h2>

          {subtitle && (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Form Content */}
        {children}

        {/* Footer Slot */}
        {footer && <div className="mt-6">{footer}</div>}
      </motion.div>
    </div>
  );
}
