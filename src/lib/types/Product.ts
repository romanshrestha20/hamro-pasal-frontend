export interface Image {
  id: string;
  url: string;
  productId?: string;
  userId?: string;
  reviewId?: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string | number; // Prisma Decimal serializes as string
  rating: number;
  stock: number;
  image?: string;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  images?: Image[];
  categories?: Category[];
}

export interface Favorite {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  createdAt: string;

}

export interface Cart {
  id: string;
  userId: string;
  seesionId?: string;
  createdAt: string;
  updatedAt: string;
  items?: CartItem[];

}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  unitPrice: string | number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

// export interface Order {

// }
// export interface OrderItem {

// }