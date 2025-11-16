"use client";
import React from "react";

interface StockStatusProps {
  stock: number;
}

export const StockStatus: React.FC<StockStatusProps> = ({ stock }) => {
  if (stock <= 0)
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Out of Stock
      </span>
    );
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        In Stock
      </span>
      <span className="text-sm text-gray-600">
        {stock} {stock === 1 ? "unit" : "units"} available
      </span>
    </div>
  );
};
