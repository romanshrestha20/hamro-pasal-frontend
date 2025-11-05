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
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-800 ${className}`}
      >
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100">
            {title}
          </h2>
          {subtitle && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-2 text-sm">
              {subtitle}
            </p>
          )}
        </div>

        {children}

        {footer && <div className="mt-5">{footer}</div>}
      </motion.div>
    </div>
  );
}
