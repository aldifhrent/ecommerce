"use client";

import { useState, useCallback } from "react";
import { Product } from "@/types";
import { getProduct } from "@/actions/product";
import ProductList from "@/components/all.products.list";
import FiltersProduct from "@/components/filter.products";
import Header from "@/components/header";

export default function Page() {
  const allProducts = getProduct(); // Semua produk
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(allProducts);

  const handleFilterChange = useCallback((filtered: Product[]) => {
    setFilteredProducts(filtered);
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="flex mt-20 gap-20">
        {/* Sidebar Filter */}
        <aside className="w-64 pr-4">
          <h2 className="text-lg font-medium mb-4">Filter</h2>
          <FiltersProduct
            products={allProducts}
            onFilterChange={handleFilterChange}
          />
        </aside>

        {/* Product List */}
        <div className="w-3/4">
          <h1 className="text-4xl font-bold">All Products</h1>
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
