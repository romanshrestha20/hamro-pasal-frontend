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

  /* ------------------------------------------
     Fetch Product
  ------------------------------------------- */
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      setLoading(true);
      setError(null);

      const result = await getProductById(productId);

      if (result.success && !Array.isArray(result.data)) {
        setProduct(result.data);
      } else {
        setError("Product not found");
      }

      setLoading(false);
    };

    fetchProduct();
  }, [productId, getProductById]);

  /* ------------------------------------------
     Actions
  ------------------------------------------- */
  const handleAddToCart = (product: Product, quantity: number) => {
    toast.success(`Added ${quantity} x ${product.name} to cart!`);
  };

  const handleWishList = (product: Product) => {
    toast.success(`${product.name} added to wishlist!`);
  };

  /* ------------------------------------------
     Related Products
  ------------------------------------------- */
  const relatedProducts = useMemo(() => {
    if (!product || !product.categories?.length) return [];

    const categoryIds = new Set(product.categories.map((c) => c.id));

    return products
      .filter(
        (p) =>
          p.id !== product.id &&
          p.categories?.some((c) => categoryIds.has(c.id))
      )
      .slice(0, 12);
  }, [product, products]);

  /* ------------------------------------------
     Loading State
  ------------------------------------------- */
  if (loading) {
    return (
      <div className="container px-4 py-8 mx-auto text-center">
        <div className="inline-block w-12 h-12 border-b-2 rounded-full border-primary animate-spin" />
        <p className="mt-4 text-muted-foreground">Loading product...</p>
      </div>
    );
  }

  /* ------------------------------------------
     Error State
  ------------------------------------------- */
  if (error || !product) {
    return (
      <div className="container px-4 py-8 mx-auto text-center">
        <p className="text-lg font-semibold text-error">
          {error || "Product not found"}
        </p>

        <Button
          onClick={() => router.push("/products")}
          className="inline-flex items-center gap-2 mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Button>
      </div>
    );
  }

  /* ------------------------------------------
     Main Page
  ------------------------------------------- */
  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Back Button */}
      <Button
        onClick={() => router.back()}
        variant="secondary"
        className="inline-flex items-center gap-2 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      {/* Product Detail */}
      <ProductDetail
        product={product}
        relatedProducts={relatedProducts}
      />
    </div>
  );
}
