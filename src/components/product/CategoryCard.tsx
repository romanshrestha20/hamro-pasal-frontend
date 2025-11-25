// frontend/src/components/product/CategoryCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useProductContext } from "@/context/ProductContext";

const CategoryCard: React.FC = () => {
  const { categories, products, loading } = useProductContext();

  if (loading) return <p>Loading categories...</p>;
  if (!categories || categories.length === 0) return <p>No categories</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {categories.map((cat) => {
        const product = products.find((p) => p.id === cat.productId);
        const imageUrl =
          product?.images?.[0]?.url || (product?.image as string | undefined);

        return (
          <Link
            key={cat.id}
            href={`/categories/${cat.id}`}
            className="flex flex-col overflow-hidden border rounded-lg shadow-sm bg-card border-border"
          >
            {imageUrl && (
              <div className="relative w-full h-40">
                <Image
                  src={imageUrl}
                  alt={product?.name ?? cat.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-4">
              <h3 className="text-base font-semibold text-foreground">
                {cat.name}
              </h3>
              {product && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {product.name}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryCard;
