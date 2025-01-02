/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { api } from "@/lib/api";
import { Product } from "@/types";
import { useState, useEffect } from "react";

export const getProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures it runs once when the component mounts.

  return products;
};

export const useProductById = (slug: string) => {
  const [product, setProduct] = useState<Product | null>(null); // Initial state is null, for a single product
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${slug}`);
        setProduct(res.data); // Assuming response contains the product object
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product.");
        console.log(err);
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  return { product, loading, error };
};
