"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { OrderSuccess } from "@/components/order";
import { Button } from "@/components/ui";

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  return (
    <main className="container px-4 py-12 mx-auto">
      <div className="max-w-2xl mx-auto">
        <OrderSuccess orderId={orderId} />

        <div className="flex justify-center gap-4 mt-8">
          <Link href="/products">
            <Button variant="secondary">Continue Shopping</Button>
          </Link>
          <Link href={`/orders/${orderId}`}>
            <Button>View Order Details</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
