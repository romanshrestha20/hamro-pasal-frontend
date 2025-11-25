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

  return hasDiscount ? (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-lg line-through text-muted-foreground">
        {formatPrice(price)}
      </span>

      <span className="text-xl font-bold text-error">
        {formatPrice(discountPrice)}
      </span>
    </div>
  ) : (
    <span className={`text-xl font-bold text-foreground ${className}`}>
      {formatPrice(price)}
    </span>
  );
}
