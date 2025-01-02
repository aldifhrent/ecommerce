/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";

interface FilterProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
}

export default function FiltersProduct({
  products,
  onFilterChange,
}: FilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isDiscounted, setIsDiscounted] = useState(false);

  useEffect(() => {
    // Filter products based on the selected criteria
    const filtered = products.filter((product) => {
      // Filter by category
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      if (
        selectedBrands.length > 0 &&
        !selectedBrands.includes(product.brand as string)
      ) {
        return false;
      }

      // Filter by discount
      if (isDiscounted && !product.discount) {
        return false;
      }

      return true;
    });

    // Pass the filtered products to the parent component
    onFilterChange(filtered);
  }, [
    selectedCategory,
    selectedBrands,
    isDiscounted,
    products,
    onFilterChange,
  ]);

  const brands = ["Apple", "Samsung", "Xiaomi", "ZTE", "Huawei"];

  return (
    <>
      <FilterSection title="Produk Diskon">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isDiscounted}
            onChange={(e) => setIsDiscounted(e.target.checked)}
            className="rounded border-gray-300"
          />
          <span className="text-sm">Produk Diskon</span>
        </label>
      </FilterSection>

      <FilterSection title="Brand">
        {brands.map((brand) => (
          <label key={brand} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedBrands([...selectedBrands, brand]);
                } else {
                  setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                }
              }}
              className="rounded border-gray-300"
            />
            <span className="text-sm">{brand}</span>
          </label>
        ))}
      </FilterSection>
    </>
  );
}

const FilterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6 border-b pb-4">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-sm font-medium">{title}</h3>
      <span className="text-gray-500">^</span>
    </div>
    {children}
  </div>
);
