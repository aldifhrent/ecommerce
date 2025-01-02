"use client";

import useCart from "@/actions/use.cart";
import Header from "@/components/header";

export default function Page() {
  const cart = useCart();
  return (
    <div className="container">
      <Header />
      <div className="mt-20">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        {cart.items.map((item) => (
          <div key={item.id}>
            <h1>{item.phoneName}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
