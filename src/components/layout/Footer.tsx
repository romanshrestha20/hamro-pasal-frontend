"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui";

export function Footer() {
  const [email, setEmail] = useState("");
  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Enter an email to subscribe");
      return;
    }
    // Placeholder: integrate real subscription endpoint later
    toast.success("Subscribed successfully!");
    setEmail("");
  };

  return (
    <footer className="mt-16 border-t border-gray-200 bg-white/70 backdrop-blur-sm dark:bg-gray-900/80 dark:border-gray-800">
      <div className="px-4 py-12 mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white rounded-lg bg-bright-blue-500">
                H
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Hamro Pasal
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Your one-stop shop for everyday essentials and curated favorites.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-gray-100">
              Shop
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/products"
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-gray-100">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/help"
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-gray-100">
              Stay Updated
            </h3>
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              Join our newsletter for product drops & offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2 text-sm border rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-10 mt-10 text-xs border-t border-gray-200 dark:border-gray-800 md:flex-row md:items-center md:justify-between">
          <p className="text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Hamro Pasal. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-gray-500 dark:text-gray-400">
            <Link
              href="/privacy"
              className="hover:text-gray-700 dark:hover:text-gray-200"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-gray-700 dark:hover:text-gray-200"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="hover:text-gray-700 dark:hover:text-gray-200"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
