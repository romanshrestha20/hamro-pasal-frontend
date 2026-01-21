import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/context/AuthContext";
import { ProductProvider } from "@/context/ProductContext";
import { FavoriteProvider } from "@/context/FavoriteContext";
import { CartProvider } from "@/context/CartContext";
import { ReviewProvider } from "@/context/ReviewContext";
import { ImageProvider } from "@/context/ImageProvider";
import { OrderProvider } from "@/context/OrderContext";
import { Toaster } from "react-hot-toast";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import MobileCartBar from "@/components/cart/MobileCartBar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next"

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

        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <AuthProvider>
            <ProductProvider>
              <CartProvider>
                <OrderProvider>
                  <ImageProvider>
                    <FavoriteProvider>
                      <Toaster position="top-center" />
                      <NavbarWrapper />
                      <ReviewProvider>
                        <main className="min-h-screen pb-16">{children}</main>
                        <Footer />
                        <MobileCartBar />
                      </ReviewProvider>
                    </FavoriteProvider>
                  </ImageProvider>
                </OrderProvider>
              </CartProvider>
            </ProductProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
