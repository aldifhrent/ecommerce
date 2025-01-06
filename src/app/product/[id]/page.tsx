"use client";

import React, { useState } from "react";
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
      <div className="flex items-start justify-center gap-8 mt-20">
        {/* Left side - Images */}
        <div>
          <div>
            <Carousel
              className="mr-12 w-[600px]"
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
                {product.images && product.images.length > 0 ? (
                  product.images.map((_, index) => (
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
                  ))
                ) : (
                  <div>No images available</div>
                )}
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
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border rounded-l"
                >
                  -
                </button>
                <input
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
              <button
                className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg"
                onClick={() => {
                  cart.addItem(product);
                  window.location.href = "/cart";
                }}
              >
                Beli Langsung
              </button>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-bold mb-4">Detail Produk</h2>
            {Array.isArray(product.detailPhone?.detail) ? (
              product.detailPhone.detail.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <p>{product.detailPhone?.detail}</p>
            )}
            {product.detailPhone &&
              product.detailPhone.isiKotak?.length > 0 && (
                <div className="mt-4">
                  <h2 className="text-lg font-bold mb-4">Isi Kotak</h2>
                  <ul className="space-y-2">
                    {product.detailPhone?.isiKotak?.map(
                      (spec: string, idx: number) => (
                        <li key={idx} className="text-sm text-gray-600">
                          • {spec}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
          </div>
        </div>

        {product.color?.length && (
          <div>
            <h2 className="text-xl font-bold mb-4">Pilih Varian</h2>
            <div className="space-y-4">
              {/* Warna (Color) */}
              <div>
                <h3 className="font-semibold mb-2">Warna</h3>
                {product.color && product.color.length > 0 ? (
                  <div className="flex gap-2">
                    {product.color.map((c, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded-full border-2 cursor-pointer"
                        style={{ backgroundColor: c.code }}
                        title={c.name}
                      ></div>
                    ))}
                  </div>
                ) : (
                  <p>No colors available</p> // Fallback message when no colors
                )}
              </div>

              {/* Kapasitas (Capacity) */}
              {product.capacity && product.capacity.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Penyimpanan</h3>
                  <div className="flex gap-4">
                    {product.capacity.map((cap, idx) => (
                      <button
                        key={idx}
                        className="px-4 py-2 border rounded-lg cursor-pointer hover:shadow-lg hover:bg-gray-100"
                      >
                        {cap} GB
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
