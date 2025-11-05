"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { UserMenu } from "./UserMenu";
import { NavbarSearch } from "./NavbarSearch";
import NavbarLink from "./NavbarLink";

export default function Navbar() {
  const { isAuthenticated, loading } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-soft-lavender-500 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-bright-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                Hamro Pasal
              </span>
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <NavbarSearch />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavbarLink href="/products" label="Products" />
            <NavbarLink href="/categories" label="Categories" />

            {/* User Menu or Auth Links */}
            {!loading && (
              <>
                {isAuthenticated ? (
                  <UserMenu />
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/login"
                      className="text-gray-700 dark:text-gray-300 hover:text-bright-blue-500 dark:hover:text-bright-blue-400 font-medium transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="px-4 py-2 bg-bright-blue-500 text-white rounded-lg hover:bg-bright-blue-600 transition-colors font-medium shadow-sm"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile Search - Shows below nav */}
        <div className="md:hidden pb-3">
          <NavbarSearch />
        </div>
      </div>
    </nav>
  );
}
