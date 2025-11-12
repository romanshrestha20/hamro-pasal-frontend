// model Image {
//   id        String   @id @default(uuid())
//   url       String
//   productId String?
//   userId    String?
//   reviewId  String?
//   product   Product? @relation(fields: [productId], references: [id], onDelete: Cascade)
//   review    Review?  @relation(fields: [reviewId], references: [id], onDelete: Cascade)
//   user      User?    @relation(fields: [userId], references: [id], onDelete: Cascade)

//   @@index([productId])
//   @@index([userId])
//   @@index([reviewId])
// }

export interface Image {
    id: string;
    url: string;
    alt: string;
    productId: string;
    userId: string;
    reviewId: string;
}