"use client";

import { Product } from "@/types";
import Image from "next/image";
import { price } from "@/lib/price";
import { Badge } from "./ui/badge";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="relative border border-gray-200 rounded-lg shadow-md hover:shadow-xl overflow-hidden"
        >
          <div className="w-full h-[200px] p-4">
            <Badge
              className={`${
                product.discount > 0 ? "block" : "hidden"
              } absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold py-1 px-2 rounded-full hover:cursor-pointer`}
            >
              {product.discount > 0 ? product.discount : 0}% OFF
            </Badge>
            <Image
              src={product.images?.[0] || "/testor.png"}
              alt={product.phoneName}
              width={150}
              height={150}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.phoneName}</h3>
            <p className="text-xl font-bold mt-2">{price(product.price)}</p>
            <button className="w-full mt-4 bg-black text-white py-2 rounded-md hover:bg-gray-800">
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
