"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProductDetail } from "@/components/product";
import { useProductContext } from "@/context/ProductContext";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/Button";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getProductById, products } = useProductContext();
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

  // Derive related products based on overlapping category IDs, excluding current product
  const relatedProducts = useMemo(() => {
    if (!product || !product.categories?.length) return [] as Product[];
    const categoryIds = new Set(product.categories.map((c) => c.id));
    return products
      .filter(
        (p) =>
          p.id !== product.id &&
          p.categories?.some((c) => categoryIds.has(c.id))
      )
      .slice(0, 12); // limit displayed related items
  }, [product, products]);

  if (loading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="text-center">
          <p className="text-lg font-semibold text-red-600">
            {error || "Product not found"}
          </p>
          <Button
            onClick={() => router.push("/products")}
            className="inline-flex items-center gap-2 px-4 py-2 mt-4 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Back Button */}
      <Button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 mb-6 text-gray-600 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      {/* Product Detail */}
      <ProductDetail
        product={product}
        onAddToCart={handleAddToCart}
        onWishList={handleWishList}
        relatedProducts={relatedProducts}
      />
    </div>
  );
}
