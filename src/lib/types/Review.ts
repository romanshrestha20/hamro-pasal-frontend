export interface Review {
    id: string;
    userId: string;
    productId: string;
    rating: number;
    title: string;
    comment: string;
    images?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Reply {
    id: string;
    userId: string;
    reviewId: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
}


export interface ReviewLike {
    id: string;
    userId: string;
    reviewId: string;
    createdAt: string;
}