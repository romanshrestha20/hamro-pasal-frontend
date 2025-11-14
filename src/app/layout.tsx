import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/context/AuthContext";
import { ProductProvider } from "@/context/ProductContext";
import { FavoriteProvider } from "@/context/FavoriteContext";
import { CartProvider } from "@/context/CartContext"; // ⬅️ add this
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
    <html lang="en" data-scroll-behavior="smooth">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <AuthProvider>
            <ProductProvider>
              <FavoriteProvider>
                <CartProvider>
                  <Toaster position="top-center" />
                  <Navbar />
                  <main className="container flex-1 px-4 py-6 mx-auto"></main>
                  {children}
                  <main />
                </CartProvider>
              </FavoriteProvider>
            </ProductProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
