"use client";
import React from "react";
import type { Product } from "@/lib/types";

// We rely on Product.categories shape; define minimal Category interface if not globally exported
interface Category {
  id: string;
  name: string;
}

interface CategoriesListProps {
  categories?: Category[] | Product["categories"];
}

export const CategoriesList: React.FC<CategoriesListProps> = ({
  categories,
}) => {
  if (!categories || categories.length === 0) return null;
  return (
    <section>
      <h3 className="mb-2 text-sm font-semibold text-gray-900">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <span
            key={category.id}
            className="inline-flex items-center px-3 py-1 text-sm text-blue-700 bg-blue-100 rounded-full"
          >
            {category.name}
          </span>
        ))}
      </div>
    </section>
  );
};
