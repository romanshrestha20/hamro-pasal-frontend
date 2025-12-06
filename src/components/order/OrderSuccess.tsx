"use client";

export default function OrderSuccess({ orderId }: { orderId: string }) {
  return (
    <div className="py-20 text-center">
      <h1 className="text-3xl font-bold">Order Placed Successfully 🎉</h1>

      <p className="mt-3 text-muted-foreground">
        Your order <strong>{orderId}</strong> has been created.
      </p>

      <a href={`/order/${orderId}`} className="inline-block mt-6 btn-primary">
        View Order Details
      </a>
    </div>
  );
}
