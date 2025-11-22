import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/context/AuthContext";
import { ProductProvider } from "@/context/ProductContext";
import { FavoriteProvider } from "@/context/FavoriteContext";
import { CartProvider } from "@/context/CartContext";

import { Toaster } from "react-hot-toast";
import NavbarWrapper from "@/components/layout/NavbarWrapper"; // <- client wrapper
import { Footer as SiteFooter } from "@/components/layout/Footer";
import { ReviewProvider } from "@/context/ReviewContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hamro Pasal",
  description: "Your one-stop shop for everything you need!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google OAuth MUST run in client component */}
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <AuthProvider>
            <CartProvider>
              <FavoriteProvider>
                <ProductProvider>
                  <Toaster position="top-center" />
                  <NavbarWrapper /> {/* safe client component */}
                  <ReviewProvider>
                    <main className="min-h-screen">{children}</main>
                  </ReviewProvider>
                  {/* Global footer */}
                  <SiteFooter />
                </ProductProvider>
              </FavoriteProvider>
            </CartProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
