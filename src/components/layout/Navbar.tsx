"use client";

import Link from "next/link";
import { NavbarSearch } from "./NavbarSearch";
import { NavbarLink } from "./NavbarLink";
import { UserMenu } from "./UserMenu";
import { MobileMenu } from "./MobileMenu";
import { X } from "lucide-react";
import { useState } from "react";
import CategoriesSidebar from "./CategoriesSidebar";
import { ChevronDown } from "lucide-react";
import { useProductContext } from "@/context/ProductContext";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { categories } = useProductContext();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm dark:bg-gray-900 dark:border-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-bright-blue-500">
              <span className="text-xl font-bold text-white">H</span>
            </div>
            <span className="hidden text-xl font-bold sm:block dark:text-white">
              Hamro Pasal
            </span>
          </Link>

          {/* Search (desktop) */}
          <div className="flex-1 hidden max-w-md mx-8 md:flex">
            <NavbarSearch />
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="items-center hidden space-x-6 md:flex">
            <NavbarLink href="/products" label="Products" />

            <div
              className="relative hidden md:block"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              {/* Trigger */}
              <NavbarLink href="#" label="Categories" />

              {/* Dropdown */}
              {open && (
                <div className="absolute left-0 z-50 w-56 py-2 mt-2 bg-white border rounded-lg shadow-lg dark:bg-gray-900 dark:border-gray-700">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.id}`}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavbarLink href="/cart" label="Cart" />
          </div>

          {/* MOBILE MENU BUTTON */}
          <UserMenu />
        </div>

        {/* Mobile search */}
        <div className="pb-3 md:hidden">
          <NavbarSearch />
        </div>
      </div>

      {/* DESKTOP CATEGORY SLIDE-IN SIDEBAR */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />

          <aside
            className={`
              fixed top-0 left-0 h-full w-64 z-50
              bg-white dark:bg-gray-900 border-r dark:border-gray-700 shadow-xl
              transform transition-transform duration-300
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-semibold dark:text-white">
                Categories
              </h2>
              <button
                aria-label="Close sidebar"
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sidebar content */}
            <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
              <CategoriesSidebar
                selectedCategory={null}
                onCategorySelect={() => setSidebarOpen(false)}
              />
            </div>
          </aside>
        </>
      )}
    </nav>
  );
}
