interface ProductPriceProps {
  price: number;
  discountPrice?: number;
  currency?: string;
  className?: string;
}

export function ProductPrice({
  price,
  discountPrice,
  currency = "USD",
  className = "",
}: ProductPriceProps) {
  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);

  const hasDiscount = discountPrice !== undefined && discountPrice < price;

  if (hasDiscount) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-lg line-through text-gray-500">
          {formatPrice(price)}
        </span>
        <span className="text-xl font-bold text-red-600">
          {formatPrice(discountPrice)}
        </span>
      </div>
    );
  }

  return (
    <span className={`text-xl font-bold text-gray-900 ${className}`}>
      {formatPrice(price)}
    </span>
  );
}
