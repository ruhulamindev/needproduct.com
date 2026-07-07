"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import HeroSection from "@/components/home/hero"
import CategoriesSection from "@/components/home/categories-section"
import ProductSlider from "@/components/product/product-slider"
import { Product } from "@/types/product"

const MAX_PER_CATEGORY = 12 // প্রতি category-তে সর্বোচ্চ কয়টা slider-এ দেখাবে

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const res = await fetch("/data/products.json")
        const data: Product[] = await res.json()
        setProducts(data)
      } catch (error) {
        console.error("Failed to load products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const categories = [...new Set(products.map((p) => p.category))].slice(0, 5)

  return (
    <>
      <HeroSection />
      <CategoriesSection />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-10">
            {[...Array(2)].map((_, s) => (
              <div key={s}>
                <div className="h-7 w-40 bg-slate-200 rounded animate-pulse mb-5" />
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-white border rounded-lg overflow-hidden">
                      <div className="h-40 md:h-44 bg-slate-200 animate-pulse" />
                      <div className="p-3 space-y-2">
                        <div className="h-4 bg-slate-200 rounded animate-pulse" />
                        <div className="h-4 w-2/3 bg-slate-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Category Sections */}
        {!loading &&
          categories.map((category) => {
            const categoryProducts = products
              .filter((p) => p.category === category)
              .slice(0, MAX_PER_CATEGORY)

            if (categoryProducts.length === 0) return null

            return (
              <section key={category} className="mb-14">
                <div className="flex items-center justify-between mb-5 border-b border-slate-200 pb-3">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800 capitalize">
                    {category}
                  </h2>
                  <Link
                    href={`/shop?category=${encodeURIComponent(category)}`}
                    className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* 👇 grid-এর বদলে auto-slide slider */}
                <ProductSlider products={categoryProducts} />
              </section>
            )
          })}

        {/* No products */}
        {!loading && products.length === 0 && (
          <p className="text-center py-12 text-slate-500">
            No products available.
          </p>
        )}

        {/* View All Products */}
        {!loading && products.length > 0 && (
          <div className="flex justify-center mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </main>
    </>
  )
}