import { q } from "framer-motion/m";

// lib/routes.ts
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PRODUCTS: "/products",
  PRODUCT_DETAILS: (productId: string) => `/products/${productId}`,
  CART: "/cart",
  CHECKOUT: "/checkout",
  // ...
} as const;