import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  label: string;
  variant?: "primary" | "secondary" | "danger" | "outline";
}

export const Button = ({
  loading,
  label,
  variant = "primary",
  ...props
}: ButtonProps) => {
  const baseClasses =
    "px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2";
  let variantClasses = "";

  switch (variant) {
    case "primary":
      variantClasses =
        "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300";
      break;
    case "secondary":
      variantClasses =
        "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300";
      break;
    case "danger":
      variantClasses =
        "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300";
      break;
  }

  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses} ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={loading || props.disabled}
    >
      {loading ? "Loading..." : label}
    </button>
  );
};
