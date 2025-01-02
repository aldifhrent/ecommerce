import { price } from "@/lib/price";
import { Product } from "@/types";
import { X } from "lucide-react";
import Image from "next/image";

interface SheetCardItemProps {
  product: Product;
  onRemove: () => void; // Function passed as prop for handling remove
}

export default function SheetCardItem({
  product,
  onRemove,
}: SheetCardItemProps) {
  return (
    <li className="flex py-6 border-b relative">
      {" "}
      {/* Set relative here */}
      <div className="relative rounded-md overflow-hidden">
        {/* Display product image with a fallback */}
        <Image
          width={100}
          height={100}
          src={product.images?.[0] || "/testor.png"}
          alt={product.phoneName}
          className="object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-col">
        {/* Product name and details */}
        <h3 className="text-lg font-semibold">{product.phoneName}</h3>
        <p className="text-xl font-bold mt-2">
          {price(
            product.discount > 0
              ? product.price - (product.price * product.discount) / 100
              : product.price
          )}
        </p>

        {/* Remove button positioned at top right */}
        <div className="absolute top-2 right-2">
          <button onClick={onRemove} className="size-6 rounded-full">
            <X />
          </button>
        </div>
      </div>
    </li>
  );
}
