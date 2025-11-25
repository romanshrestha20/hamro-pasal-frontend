"use client";

import Link from "next/link";
import { NavbarSearch } from "./NavbarSearch";
import { NavbarLink } from "./NavbarLink";
import { UserMenu } from "./UserMenu";
import { X, ChevronDown } from "lucide-react";
import { useState } from "react";
import CategoriesSidebar from "./CategoriesSidebar";
import { useProductContext } from "@/context/ProductContext";
import { ThemeToggle } from "../ui/ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { categories } = useProductContext();

  return (
    <nav className="sticky top-0 z-50 transition-colors border-b shadow-sm bg-background border-border">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 font-bold rounded-lg bg-primary text-primary-foreground">
              H
            </div>
            <span className="hidden text-xl font-bold sm:block text-foreground">
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

            {/* Categories Dropdown */}
            <div
              className="relative hidden md:block"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <NavbarLink href="#" label="Categories" />

              {open && (
                <div className="absolute left-0 z-50 w-56 py-2 mt-2 transition-colors border rounded-lg shadow-lg bg-card border-border">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.id}`}
                      className="block px-4 py-2 text-sm transition-colors text-card-foreground hover:bg-muted"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavbarLink href="/cart" label="Cart" />
          </div>

          <ThemeToggle />
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
            className="fixed inset-0 z-40 transition-opacity bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />

          <aside
            className={`
              fixed top-0 left-0 h-full w-64 z-50
              bg-card border-r border-border shadow-xl
              transform transition-transform duration-300
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-card-foreground">
                Categories
              </h2>
              <button
                aria-label="Close sidebar"
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-md hover:bg-muted"
              >
                <X size={20} className="text-foreground" />
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
