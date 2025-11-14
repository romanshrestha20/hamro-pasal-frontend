"use client";

import { useCart } from "@/context/CartContext";
import CartItemRow from "../cart/CartItemRow";
import CartSummary from "../cart/CartSummary";
import CartEmpty from "../cart/CartEmpty";

export function CartSideBar() {
  const { items } = useCart();

  return (
    <aside className="p-4 bg-white border rounded-lg shadow-sm top-20 w-96">
      <h2 className="mb-4 text-2xl font-semibold">My Cart</h2>

      {items.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
          <CartSummary />
        </>
      )}
    </aside>
  );
}
