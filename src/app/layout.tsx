import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/context/AuthContext";
import { ProductProvider } from "@/context/ProductContext";
import { FavoriteProvider } from "@/context/FavoriteContext";
import { CartProvider } from "@/context/CartContext";
import { ReviewProvider } from "@/context/ReviewContext";

import { Toaster } from "react-hot-toast";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import { Footer as SiteFooter } from "@/components/layout/Footer";
import MobileCartBar from "@/components/cart/MobileCartBar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hamro Pasal",
  description: "Your one-stop shop for everything you need!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem("theme");
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                if (theme === "dark" || (!theme && prefersDark)) {
                  document.documentElement.classList.add("dark");
                } else {
                  document.documentElement.classList.remove("dark");
                }
              })();
            `,
          }}
        />

        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <AuthProvider>
            <ProductProvider>
              <CartProvider>
                <FavoriteProvider>
                  <Toaster position="top-center" />
                  <NavbarWrapper />
                  <ReviewProvider>
                    <main className="min-h-screen pb-16">{children}</main>
                    <MobileCartBar />
                  </ReviewProvider>
                  <SiteFooter />
                </FavoriteProvider>
              </CartProvider>
            </ProductProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
