"use client";

import Link from "next/link";
import { NavbarSearch } from "./NavbarSearch";
import { NavbarLink } from "../ui/NavbarLink";
import { UserMenu } from "./UserMenu";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import CategoriesSidebar from "./CategoriesSidebar";
import { useProductContext } from "@/context/ProductContext";
import { ThemeToggle } from "../ui/ThemeToggle";
import { CartIcon } from "../cart";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { categories } = useProductContext();

  return (
    <nav className="sticky top-0 z-50 border-b bg-background border-border backdrop-blur-lg">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* ⭐️ TOP BAR */}
        <div className="flex items-center justify-between h-16">

          {/* 📌 Left Section: Hamburger + Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile: Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md md:hidden hover:bg-muted"
              aria-label="Open categories"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 font-bold rounded-lg bg-primary text-primary-foreground">
                H
              </div>
              <span className="hidden text-xl font-bold sm:inline text-foreground">
                Hamro Pasal
              </span>
            </Link>
          </div>

          {/* 🔍 Search (Desktop Only) */}
          <div className="flex-1 hidden max-w-md mx-5 md:flex">
            <NavbarSearch />
          </div>

          {/* 🧭 Desktop Nav Items */}
          <div className="items-center hidden gap-6 md:flex">
            <NavbarLink href="/products" label="Products" />

            {/* Categories Hover Menu */}
            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <NavbarLink href="#" label="Categories" />
              {open && (
                <div className="absolute left-0 z-50 w-56 py-2 mt-2 border rounded-lg shadow-lg bg-card border-border animate-in fade-in-80 slide-in-from-top-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.id}`}
                      className="block px-4 py-2 text-sm transition-colors text-card-foreground hover:bg-muted"
                      onClick={() => setOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <CartIcon />
          </div>

          {/* 🎚 Theme + 👤 User */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>

        {/* 🔍 Mobile Search */}
        <div className="pb-3 md:hidden">
          <NavbarSearch />
        </div>
      </div>

      {/* 📌 Mobile Sidebar (Slide-In Menu) */}
      {sidebarOpen && (
        <>
          {/* Dim Background */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar */}
          <aside
            className={`
              fixed top-0 left-0 h-full w-64 z-50 bg-card border-r shadow-xl border-border
              transition-transform duration-300
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            <div className="flex items-center justify-between p-4 border-b border-border bg-card">
              <h2 className="text-lg font-semibold text-card-foreground">
                Categories
              </h2>
              <button
                aria-label="Close sidebar"
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-md hover:bg-muted"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

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
