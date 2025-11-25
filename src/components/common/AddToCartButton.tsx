"use client";
import React from "react";
import { Product } from "@/lib/types/Product";
import { useCart } from "@/context/CartContext";
import { Button } from "../ui";

interface AddToCartButtonProps {
  productId: string;
  quantity?: number;
  className?: string;
  onAddToCart?: (productId: string, quantity: number) => void;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  quantity = 1,
  className = "",
  onAddToCart,
}) => {
  const { addToCart } = useCart();
  const [loading, setLoading] = React.useState(false);
  const [added, setAdded] = React.useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      if (onAddToCart) {
        onAddToCart(productId, quantity);
      } else {
        await addToCart(productId, quantity);
      }
      setAdded(true);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="primary"
      size="sm"
      loading={loading}
      disabled={added}
      onClick={handleAddToCart}
      className={className}
    >
      {added ? "Added" : "Add to Cart"}
    </Button>
  );
};
