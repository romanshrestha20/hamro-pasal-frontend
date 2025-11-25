"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useProductContext } from "@/context/ProductContext";
import Header from "@/components/ui/Header";
import { ProductGrid } from "@/components/product/ProductGrid";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";

export default function CategoryDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { id } = params;

  const { categories, products, loading, error } = useProductContext();

  if (loading) return <LoadingState label="Loading category..." />;

  if (error)
    return (
      <ErrorState
        message="Failed to load category"
        subMessage={error}
        onRetry={() => router.refresh()}
      />
    );

  const category = categories.find((c) => c.id === id);

  if (!category)
    return (
      <div className="max-w-4xl px-4 py-12 mx-auto">
        <Header title="Category not found" />
        <p className="mt-2 text-sm text-muted-foreground">
          The category you are looking for does not exist.
        </p>
        <Link
          href="/categories"
          className="inline-block mt-4 text-sm text-primary hover:underline"
        >
          Back to Categories
        </Link>
      </div>
    );

  const categoryProducts = products.filter((p) =>
    p.categories?.some((cat) => cat.id === category.id)
  );

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <Header title={category.name} />

      <p className="mt-2 text-sm text-muted-foreground">
        Browse products under this category.
      </p>

      {categoryProducts.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">
          There are no products in this category yet.
        </p>
      ) : (
        <div className="mt-6">
          <ProductGrid products={categoryProducts} columns={4} />
        </div>
      )}

      <div className="mt-8">
        <Link
          href="/categories"
          className="text-sm text-primary hover:underline"
        >
          ← Back to all categories
        </Link>
      </div>
    </div>
  );
}
