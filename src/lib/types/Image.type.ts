export interface Image {
    id: string;
    url: string;        // relative or filename (as stored in DB)
    fullUrl?: string;   // absolute URL from backend
    alt?: string;

    userId?: string;
    productId?: string;
    reviewId?: string;

    createdAt: string;
    updatedAt: string;
}
