import { Suspense } from "react";
import ProductsClient from "./ProductsPageClient";
import LoadingState from "@/components/common/LoadingState";

export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading products..." />}>
      <ProductsClient />
    </Suspense>
  );
}
