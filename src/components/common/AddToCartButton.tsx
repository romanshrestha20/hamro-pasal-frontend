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
  className,
  onAddToCart,
}) => {
  const { addToCart } = useCart();
  const [loading, setLoading] = React.useState(false);
  const [added, setAdded] = React.useState(false);
  const handleAddToCart = async () => {
    setLoading(true);
    try {
      if (onAddToCart) {
        // If a custom handler is provided, use it
        const product: Product = { id: productId } as Product; // Minimal product object
        onAddToCart(productId, quantity);
        setAdded(true);
      } else {
        // Default behavior: call addToCart from context
        await addToCart(productId, quantity);
        setAdded(true);
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={loading || added}
      className={className}
    >
      {loading ? "Adding..." : added ? "Added" : "Add to Cart"}
    </Button>
  );
};
