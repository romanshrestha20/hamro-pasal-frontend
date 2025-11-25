"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import type { Product } from "@/lib/types";
import { useFavorite } from "@/context/FavoriteContext";
import { useCart } from "@/context/CartContext";
import YouMayAlsoLike from "./YouMayAlsoLike";

import {
  ImageGallery,
  RatingStars,
  StockStatus,
  CategoriesList,
  QuantitySelector,
} from "./partials";
import ReviewList from "../review/ReviewList";
import ReviewForm from "../review/ReviewForm";
import { AddToCartButton } from "../common/AddToCartButton";
import { FavoriteButton } from "../common/FavoriteButton";
// Removed stray events import

interface ProductDetailProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
  onWishList?: (product: Product) => void;
  relatedProducts?: Product[];
}

export function ProductDetail({
  product,
  onAddToCart,
  onWishList,
  relatedProducts,
}: ProductDetailProps) {
  // addToCart not needed directly; AddToCartButton handles logic
  useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { isFavoritedLocal } = useFavorite();
  const [addedToCart, setAddedToCart] = useState(false);
  const isFavorited = isFavoritedLocal(product.id);

  const price = useMemo(
    () =>
      typeof product.price === "string"
        ? parseFloat(product.price)
        : product.price,
    [product.price]
  );

  const images = useMemo(
    () =>
      product.images?.length
        ? product.images.map((img) => img.url)
        : product.image
          ? [product.image]
          : ["/placeholder-product.png"],
    [product.images, product.image]
  );

  return (
    <div className="space-y-16">
      {/* Layout */}
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        {/* Gallery */}
        <div className="p-4 border rounded-xl border-border bg-card shadow-card backdrop-blur-sm">
          <ImageGallery
            images={images}
            productName={product.name}
            selectedIndex={selectedImage}
            onSelect={setSelectedImage}
          />
        </div>
        {/* Info */}
        <div className="space-y-10">
          <header className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {product.name}
            </h1>
            {product.rating > 0 && (
              <div className="flex items-center gap-3">
                <RatingStars rating={product.rating} />
                <span className="text-sm text-muted-foreground">
                  {product.rating.toFixed(1)} / 5.0
                </span>
              </div>
            )}
          </header>
          <section className="py-6 space-y-4 border-y border-border">
            <div className="text-3xl font-bold text-foreground md:text-4xl">
              ${price.toFixed(2)}
            </div>
            <StockStatus stock={product.stock} />
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              Description
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </section>
          <CategoriesList categories={product.categories} />
          {product.stock > 0 && (
            <QuantitySelector
              quantity={quantity}
              stock={product.stock}
              onChange={setQuantity}
            />
          )}
          <div className="flex flex-wrap gap-3 pt-2">
            <AddToCartButton
              productId={product.id}
              quantity={quantity}
              onAddToCart={() => setAddedToCart(true)}
            />

            {addedToCart && (
              <Button
                variant="secondary"
                onClick={() => router.push("/cart")}
                className="px-5 py-3 text-sm md:text-base"
              >
                View Cart
              </Button>
            )}
            <FavoriteButton productId={product.id} />

            <div role="status" aria-live="polite" className="sr-only">
              {isFavorited ? "Favorited" : "Not favorited"};{" "}
              {addedToCart ? "Added to cart" : "Not added to cart"}
            </div>
          </div>
        </div>
      </div>
      <section className="pt-12 space-y-10 border-t border-border">
        <YouMayAlsoLike
          products={relatedProducts ?? []}
          onAddToCart={(p) => onAddToCart?.(p, 1)}
          onWishList={onWishList}
          categoryId={product.categories?.[0]?.id}
          productId={product.id}
        />
      </section>
      <section className="pt-12 space-y-8 border-t border-border">
        <ReviewForm productId={product.id} />
        <ReviewList productId={product.id} />
      </section>
    </div>
  );
}
