interface ProductTitleProps {
  title: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function ProductTitle({
  title,
  className = "",
  as: Component = "h3",
}: ProductTitleProps) {
  return (
    <Component
      className={`text-lg font-semibold text-gray-900 line-clamp-2 ${className}`}
    >
      {title}
    </Component>
  );
}
