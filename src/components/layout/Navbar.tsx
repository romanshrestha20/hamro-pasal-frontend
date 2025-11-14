"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { UserMenu } from "./UserMenu";
import { NavbarSearch } from "./NavbarSearch";
import NavbarLink from "./NavbarLink";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm dark:bg-gray-900 border-soft-lavender-500 dark:border-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-bright-blue-500">
                <span className="text-xl font-bold text-white">H</span>
              </div>
              <span className="hidden text-xl font-bold text-gray-900 dark:text-white sm:block">
                Hamro Pasal
              </span>
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="flex-1 hidden max-w-md mx-8 md:flex">
            <NavbarSearch />
          </div>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-6 md:flex">
            <NavbarLink href="/products" label="Products" />
            <NavbarLink href="/categories" label="Categories" />
            <NavbarLink href="/cart" label="Cart" />

            {/* User Menu or Auth Links */}

            <UserMenu />
          </div>
        </div>

        {/* Mobile Search - Shows below nav */}
        <div className="pb-3 md:hidden">
          <NavbarSearch />
        </div>
      </div>
    </nav>
  );
}
