import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  label?: string;
  variant?: "primary" | "secondary" | "danger" | "outline" | "default";
  children?: ReactNode;
}

export const Button = ({
  loading,
  label,
  variant = "primary",
  children,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 inline-flex items-center justify-center";
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
    case "outline":
      variantClasses =
        "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 focus:ring-gray-300";
      break;
    case "default":
    default:
      variantClasses = "bg-white text-gray-800 hover:bg-gray-50";
      break;
  }

  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses} ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={loading || props.disabled}
    >
      {loading ? "Loading..." : (children ?? label)}
    </button>
  );
};
