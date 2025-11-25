"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Enter your email to subscribe!");

    toast.success("Subscribed successfully!");
    setEmail("");
  };

  return (
    <footer className="mt-16 border-t border-border bg-card/70 backdrop-blur-sm">
      <div className="px-4 py-12 mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 text-lg font-bold rounded-lg bg-primary text-primary-foreground">
                H
              </div>
              <span className="text-xl font-semibold text-foreground">
                Hamro Pasal
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Your one-stop shop for everyday essentials & curated favorites.
            </p>
          </div>

          {/* Shop Links */}
          <FooterColumn title="Shop">
            <FooterLink href="/products">All Products</FooterLink>
            <FooterLink href="/favorites">Favorites</FooterLink>
            <FooterLink href="/cart">Cart</FooterLink>
            <FooterLink href="/profile">Profile</FooterLink>
          </FooterColumn>

          {/* Support Links */}
          <FooterColumn title="Support">
            <FooterLink href="/help">Help Center</FooterLink>
            <FooterLink href="/returns">Returns</FooterLink>
            <FooterLink href="/shipping">Shipping</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
          </FooterColumn>

          {/* Newsletter */}
          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide uppercase text-foreground">
              Stay Updated
            </h3>
            <p className="mb-3 text-sm text-muted-foreground">
              Get product drops & exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2 text-sm border rounded-md outline-none bg-background text-foreground border-border focus-visible:ring-2 focus-visible:ring-accent"
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
              <p className="text-xs text-muted-foreground">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col gap-4 pt-10 mt-10 text-xs border-t border-border md:flex-row md:items-center md:justify-between">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} Hamro Pasal. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-4 text-muted-foreground">
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
            <FooterLink href="/cookies">Cookies</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ----------------📌 Reusable UI Components------------------- */

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold tracking-wide uppercase text-foreground">
        {title}
      </h3>
      <ul className="space-y-2 text-sm text-muted-foreground">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="transition-colors hover:text-foreground"
      >
        {children}
      </Link>
    </li>
  );
}
