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
