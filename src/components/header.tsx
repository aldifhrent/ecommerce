"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SheetCart from "./sheet.cart";
import { CategoryMenu } from "./category.menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import { CiHeart } from "react-icons/ci";
export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="container mt-10">
      <div className="flex items-center justify-between gap-4 lg:gap-20">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Logo" width={100} height={100} />
          </Link>
        </div>
        <div className="relative flex items-center">
          <Search className="size-5 lg:w-10 absolute left-1 text-gray-500 " />
          <input
            aria-label="Search bar"
            type="text"
            className="w-full md:w-[507px] h-[48px] pl-10 pr-4 text-sm md:text-md placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
            placeholder="Search essentials, groceries and more..."
          />
        </div>

        <nav className="flex items-center gap-4 divide-x-2">
          {/* <CategoryMenu /> */}
          <div>
            {session?.user ? (
              <div className="flex items-center gap-2 pl-2 hover:cursor-pointer">
                <Avatar className="size-8">
                  {session?.user.image ? (
                    <AvatarImage src={session.user.image || ""} />
                  ) : (
                    <div className="bg-gray-500 size-8 rounded-full"></div>
                  )}
                </Avatar>

                <p className="">{session.user.name}</p>
              </div>
            ) : (
              <div className="flex items-center gap-4 pl-2">
                <User
                  size={25}
                  className="rounded-full bg-[#008ECC] text-white p-[2px]"
                />

                <div>
                  <Link
                    href="/sign-in"
                    className="hover:underline hover:underline-offset-4 hover:font-bold"
                  >
                    Sign In
                  </Link>
                  <span> / </span>
                  <Link
                    href="/sign-up"
                    className="hover:underline hover:underline-offset-4 hover:font-bold"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>
          {/* <div className="flex gap-2 pl-2">
            <CiHeart className="size-6 " />
            <p>Favorite</p>
          </div> */}
          <SheetCart />
        </nav>
      </div>
    </header>
  );
}
