"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui";
import type { Product } from "@/lib/types";
import { useFavorite } from "@/context/FavoriteContext";
import { useCart } from "@/context/CartContext";
import YouMayAlsoLike from "./YouMayAlsoLike";

import {
  ImageGallery,
  RatingStars,
  StockStatus,
  TagsList,
  CategoriesList,
  QuantitySelector,
} from "./partials";
import ReviewList from "../review/ReviewList";
import ReviewForm from "../review/ReviewForm";
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
  const { addToCart } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { toggleFavorite, isFavoritedLocal } = useFavorite();
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

  const handleAddToCart = async () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
    } else {
      await addToCart(product.id, quantity);
    }
    setAddedToCart(true);
  };

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Main Product Layout */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left: Gallery */}
        <div className="p-4 transition-all duration-300 border shadow-lg rounded-2xl bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm border-neutral-200/60 dark:border-neutral-800/60">
          <ImageGallery
            images={images}
            productName={product.name}
            selectedIndex={selectedImage}
            onSelect={setSelectedImage}
          />
        </div>

        {/* Right: Product Info */}
        <div className="px-2 space-y-8">
          {/* Title + Rating */}
          <header className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              {product.name}
            </h1>

            {product.rating > 0 && (
              <div className="flex items-center gap-3">
                <RatingStars rating={product.rating} />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {product.rating.toFixed(1)} / 5.0
                </span>
              </div>
            )}
          </header>

          {/* Pricing + Stock */}
          <section className="py-6 space-y-3 border-y border-neutral-200 dark:border-neutral-700">
            <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              ${price.toFixed(2)}
            </div>
            <StockStatus stock={product.stock} />
          </section>

          {/* Description */}
          <section className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
              Description
            </h2>
            <p className="opacity-90">{product.description}</p>
          </section>

          {/* Tags + Categories */}
          <CategoriesList categories={product.categories} />

          {/* Quantity Selector */}
          {product.stock > 0 && (
            <QuantitySelector
              quantity={quantity}
              stock={product.stock}
              onChange={setQuantity}
            />
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 h-12 text-lg transition-all shadow-md hover:shadow-lg rounded-xl"
            >
              <ShoppingCart className="w-6 h-6 mr-2" />
              {addedToCart ? "Added" : "Add to Cart"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                toggleFavorite(product.id);
                onWishList?.(product);
              }}
              aria-label={
                isFavorited ? "Remove from favorites" : "Add to favorites"
              }
              aria-pressed={isFavorited}
              className="h-12 px-5 text-lg rounded-xl border-neutral-300 hover:border-neutral-400 dark:border-neutral-700"
            >
              <Heart
                className={
                  "w-6 h-6 transition-colors " +
                  (isFavorited
                    ? "text-red-600"
                    : "text-gray-600 dark:text-gray-300")
                }
                style={{ fill: isFavorited ? "currentColor" : "none" }}
              />
            </Button>
            {addedToCart && (
              <Button
                variant="secondary"
                onClick={() => router.push("/cart")}
                className="h-12 px-5 text-lg shadow-sm rounded-xl"
              >
                View Cart
              </Button>
            )}
            <div role="status" aria-live="polite" className="sr-only">
              {isFavorited ? "Favorited" : "Not favorited"};{" "}
              {addedToCart ? "Added to cart" : "Not added to cart"}
            </div>
          </div>
        </div>
      </div>

      {/* YOU MAY ALSO LIKE */}
      <section className="pt-12 mt-12 border-t border-neutral-300 dark:border-neutral-700">
        <YouMayAlsoLike
          products={relatedProducts ?? []}
          onAddToCart={(p) => onAddToCart?.(p, 1)}
          onWishList={onWishList}
          categoryId={product.categories?.[0]?.id}
          productId={product.id}
        />
      </section>

      <div>
        {/* existing product UI */}
        <section className="pt-12 mt-12 border-t border-neutral-300 dark:border-neutral-700">
          <ReviewForm productId={product.id} />
          <div className="mt-6">
            <ReviewList productId={product.id} />
          </div>
        </section>
      </div>
    </div>
  );
}
