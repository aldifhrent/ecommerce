import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import useCart from "@/actions/use.cart";
import SheetCardItem from "./sheet.card.item";
import Link from "next/link";

export default function SheetCart() {
  const cart = useCart();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative flex items-center gap-2 pl-2 cursor-pointer">
          <div className="relative flex">
            <ShoppingCart
              size={30}
              className="rounded-full bg-[#008ECC] text-white p-[2px]"
            />
            <div className="absolute top-0 right-0 bg-gray-800 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              {cart.items.length}
            </div>
          </div>
          <p className="hidden lg:block">Cart</p>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            Review your cart items and proceed to checkout.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {cart.items.map((item) => (
            <SheetCardItem
              key={item.id}
              product={item}
              onRemove={() => cart.removeItem(item.id as string)}
            />
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Link href="/cart" className="w-full">
              <Button type="submit" className="w-full">
                Check Out
              </Button>
            </Link>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
