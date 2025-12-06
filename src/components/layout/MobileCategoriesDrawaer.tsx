"use client";

import { X, Menu } from "lucide-react";
import { useState } from "react";
import CategoriesSidebar from "./CategoriesSidebar";

export function MobileCategoriesDrawer({
  selectedCategory,
  onCategorySelect,
}: {
  selectedCategory: string | null;
  onCategorySelect: (c: string | null) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Button */}
      <button
        className="p-2 rounded-md lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => setOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-in Panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 shadow-xl z-50 
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold">Categories</h2>
          <button
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Reuse your sidebar */}
        <CategoriesSidebar
          selectedCategory={selectedCategory}
          onCategorySelect={(c) => {
            onCategorySelect(c);
            setOpen(false); // close drawer after select
          }}
          className="p-4"
        />
      </aside>
    </>
  );
}