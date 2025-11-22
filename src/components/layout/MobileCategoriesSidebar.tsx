// components/LeftCategoriesDrawer.tsx
"use client";

import { useState } from "react";
import { X, Menu } from "lucide-react";
import CategoriesSidebar from "./CategoriesSidebar";

export function MobileCategoriesSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-md md:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Menu size={24} />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 z-50 bg-white dark:bg-gray-900 
        border-r dark:border-gray-700 shadow-xl transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold">Categories</h2>
          <button
            aria-label="Close sidebar"
            onClick={() => setOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
          <CategoriesSidebar
            selectedCategory={null}
            onCategorySelect={() => setOpen(false)}
          />
        </div>
      </aside>
    </>
  );
}
