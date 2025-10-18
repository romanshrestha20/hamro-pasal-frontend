export interface Product {
  id: number;
  name: string;
  description?: string;
  price: string; // Prisma Decimal returns string via JSON
  stockQuantity: number;
  categoryId?: number;
  createdAt: string;
  updatedAt: string;
  category?: Category;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
