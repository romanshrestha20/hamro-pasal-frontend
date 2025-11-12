"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui";
import type { Product } from "@/lib/types";
import { useFavorite } from "@/context/FavoriteContext";

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onWishList: (product: Product) => void;
}

export function ProductDetail({
  product,
  onAddToCart,
  onWishList,
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { toggleFavorite, isFavoritedLocal } = useFavorite();
  const isFavorited = isFavoritedLocal(product.id);

  const price =
    typeof product.price === "string"
      ? parseFloat(product.price)
      : product.price;
  const images =
    product.images && product.images.length > 0
      ? product.images.map((img) => img.url)
      : product.image
        ? [product.image]
        : ["/placeholder-product.png"];

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Image Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative w-full overflow-hidden bg-gray-100 rounded-lg aspect-square">
          <Image
            src={images[selectedImage]}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Thumbnail Gallery */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                  selectedImage === idx
                    ? "border-blue-600 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                aria-label={`Select image ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${product.name} ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Title and Rating */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          {product.rating > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating.toFixed(1)} / 5.0
              </span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="py-4 border-t border-b">
          <div className="text-3xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </div>
          <div className="flex items-center gap-2 mt-2">
            {product.stock > 0 ? (
              <>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  In Stock
                </span>
                <span className="text-sm text-gray-600">
                  {product.stock} {product.stock === 1 ? "unit" : "units"}{" "}
                  available
                </span>
              </>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Description
          </h2>
          <p className="leading-relaxed text-gray-700">{product.description}</p>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-900">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        {product.categories && product.categories.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-900">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.categories.map((category) => (
                <span
                  key={category.id}
                  className="inline-flex items-center px-3 py-1 text-sm text-blue-700 bg-blue-100 rounded-full"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        {product.stock > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-900">
              Quantity
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-medium text-center min-w-12">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1"
            label="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              toggleFavorite(product.id);
              onWishList(product);
            }}
            label="Add to Wishlist"
            aria-label="Add to wishlist"
          >
            <Heart className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
