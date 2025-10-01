"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/product/product-card";
import type { Product } from "@/types/product";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        // Replace with your real API endpoint
        const res = await fetch("/api/products/featured");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-slate-800 mb-12">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading &&
            [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm animate-pulse"
              >
                <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}

          {!loading && error && (
            <p className="text-center text-red-600 col-span-full mt-8">
              {error}
            </p>
          )}

          {!loading && !error && products.length === 0 && (
            <p className="text-center text-slate-600 col-span-full mt-8">
              No featured products available.
            </p>
          )}

          {!loading &&
            !error &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
}
