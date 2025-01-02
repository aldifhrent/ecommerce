import { price } from "@/lib/price";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Product } from "@/types";
import useCart from "@/actions/use.cart";
import Link from "next/link";

interface ProductProps {
  product: Product;
}
export default function BestDealsCard({ product }: ProductProps) {
  const cart = useCart();
  return (
    <div className="relative w-[227px] h-[320px] border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-xl">
      {/* Diskon */}
      <Badge
        className={`${
          product.discount > 0 ? "block" : "hidden"
        } absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold py-1 px-2 rounded-full hover:cursor-pointer`}
      >
        {product.discount > 0 ? product.discount : 0}% OFF
      </Badge>

      {/* Gambar */}
      <Link
        href={`/product/${product.id}`}
        className="flex justify-center items-center h-[60%]  p-4"
      >
        <Image
          src={product.images?.[0] || "/placeholder.jpg"}
          width={400}
          height={400}
          alt={product.phoneName}
          className="h-full object-contain"
        />
      </Link>

      {/* Detail Produk */}
      <div className="p-4">
        <h2 className="text-base font-semibold">{product.phoneName}</h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg font-bold text-black">
            {price(product.price - product.price * (product.discount / 100))}
          </span>

          <span
            className={`${
              product.discount > 0 ? "block" : "hidden"
            } text-sm line-through text-gray-500`}
          >
            {price(product.price)}
          </span>
        </div>
        <button
          className="p-1 bg-black text-white w-full mt-2 font-bold shadow-sm"
          onClick={() => cart.addItem(product)}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
