"use client";

import { getProduct } from "@/actions/product";
import BestDealsCard from "./best.deals.card";
import Link from "next/link";
import { Product } from "@/types";

export default function BestDeals() {
  const products = getProduct();
  return (
    <section className="container mt-20">
      <div className="flex flex-col ">
        <div className="flex justify-between items-center">
          <h1 className="text-xl text-[#666666] font-bold">
            Best Deals on{" "}
            <span className="text-[#008ECC] font-bold">Smartphones</span>{" "}
          </h1>
          <Link href="/product">View All</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-8  gap-8 mx-auto sm:mx-0">
          {products.map((product: Product) => (
            <BestDealsCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
