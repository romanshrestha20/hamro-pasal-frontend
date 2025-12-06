"use client";

import type { ShippingAddress } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export default function ShippingAddressCard({
  address,
}: {
  address: ShippingAddress | null | undefined;
}) {
  if (!address) return null;

  return (
    <Card variant="bordered">
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-sm">
        <p className="font-medium">{address.fullName}</p>
        <p className="text-muted-foreground">{address.phone}</p>
        <p>{address.address}</p>
        <p>
          {address.city}, {address.postalCode}
        </p>
        <p>{address.country}</p>
      </CardContent>
    </Card>
  );
}
