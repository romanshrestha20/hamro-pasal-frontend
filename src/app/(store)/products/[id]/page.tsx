"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProductDetail } from "@/components/product";
import { useProductContext } from "@/context/ProductContext";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { div } from "framer-motion/m";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getProductById } = useProductContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productId = params.id as string;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      setLoading(true);
      setError(null);

      const result = await getProductById(productId);

      if (result.success && !Array.isArray(result.data)) {
        setProduct(result.data as Product);
      } else {
        setError(!result.success ? result.error : "Product not found");
      }

      setLoading(false);
    };

    fetchProduct();
  }, [productId, getProductById]);

  const handleAddToCart = (product: Product, quantity: number) => {
    // TODO: Integrate with cart context when available
    toast.success(`Added ${quantity} x ${product.name} to cart!`);
  };

  const handleWishList = (product: Product) => {
    // TODO: Implement wishlist functionality
    toast.success(`${product.name} added to wishlist!`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg font-semibold text-red-600">
            {error || "Product not found"}
          </p>
          <button
            onClick={() => router.push("/products")}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button
        label="Back"
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      {/* Product Detail */}
      <ProductDetail
        product={product}
        onAddToCart={handleAddToCart}
        onWishList={handleWishList}
      />
    </div>
  );
}
