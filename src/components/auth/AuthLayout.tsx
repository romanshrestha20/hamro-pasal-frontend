"use client";

export const AuthLayout = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6">
      <h1 className="text-2xl font-bold text-center mb-2">{title}</h1>
      {subtitle && (
        <p className="text-center text-gray-500 mb-6">{subtitle}</p>
      )}
      {children}
    </div>
  </div>
);
