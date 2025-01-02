/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Heart, Share2, ShoppingCart } from "lucide-react";
import Header from "@/components/header";
import useCart from "@/actions/use.cart";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useProductById } from "@/actions/product";
import { price } from "@/lib/price";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "@/components/ui/badge";
export default function Page() {
  const params = useParams<{ id: string }>();
  console.log(params.id);
  const cart = useCart();

  // Fetch product using the custom hook
  const { product, loading, error } = useProductById(params.id);
  const [quantity, setQuantity] = useState(1);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="container">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 items-start">
        {/* Left side - Images */}
        <div>
          <div className="mb-4">
            <Carousel
              className="w-[600px]"
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
            >
              <CarouselContent>
                {product.images?.map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="relative p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <Image
                            src={product.images?.[index] || "/testor.png"}
                            alt="Product"
                            className="rounded-lg"
                            width={600}
                            height={600}
                          />
                          {/* Badge Diskon */}
                          {product.discount > 0 && (
                            <Badge className="absolute top-3 right-3 bg-blue-500 text-white text-sm px-2 py-1 rounded-full">
                              {product.discount}% OFF
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>

        {/* Right side - Product Info */}
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.phoneName}</h1>

          <div className="mb-6">
            <div className="text-3xl font-bold text-gray-900">
              {product.discount > 0
                ? price(
                    product.price - product.price * (product.discount / 100)
                  )
                : price(product.price)}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <button
                  // Assuming there's a quantity state
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border rounded-l"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 text-center border-t border-b"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border rounded-r"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                className="flex-1 bg-red-500 text-white py-2 rounded-lg"
                onClick={() => cart.addItem(product)}
              >
                + Keranjang
              </button>
              <button className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg">
                Beli Langsung
              </button>
            </div>

            <div className="flex gap-4 mt-4">
              <button className="flex items-center gap-2 text-gray-600">
                <Heart size={20} /> Wishlist
              </button>
              {/* <button className="flex items-center gap-2 text-gray-600">
                <Share2 size={20} /> Share
              </button> */}
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-bold mb-4">Detail Produk</h2>
            <ul className="space-y-2">{product.detailPhone?.detail}</ul>
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-4">Isi Kotak</h2>
              <ul className="space-y-2">
                {product.detailPhone?.isiKotak.map(
                  (spec: string, idx: number) => (
                    <li key={idx} className="text-sm text-gray-600">
                      • {spec}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
