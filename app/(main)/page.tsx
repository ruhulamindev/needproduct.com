"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import HeroSection from "@/components/home/hero"
import CategoriesSection from "@/components/home/categories-section"
import ProductSlider from "@/components/product/product-slider"
import { Product } from "@/types/product"
import { fetchProducts } from "@/lib/products-api"

const MAX_PER_CATEGORY = 12

function SliderSkeleton() {
  return (
    <div className="overflow-hidden">
      <div className="flex gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="shrink-0 w-[calc((100%-1rem)/2)] sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-4rem)/5)]"
          >
            <div className="bg-white border rounded-lg overflow-hidden">
              <div className="h-40 md:h-44 bg-slate-200 animate-pulse" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-slate-200 rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-slate-200 rounded animate-pulse" />
                <div className="h-5 w-2/3 bg-slate-200 rounded animate-pulse" />
                <div className="h-8 bg-slate-200 rounded animate-pulse mt-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        setError(null)
        // 👇 API থেকে (আগে fetch("/data/products.json") ছিল)
        const { products } = await fetchProducts({ limit: 100 })
        setProducts(products)
      } catch (err: any) {
        console.error("Failed to load products:", err)
        setError("পণ্য লোড করা যায়নি। Server চালু আছে কিনা দেখুন।")
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
        {loading &&
          [...Array(3)].map((_, s) => (
            <section key={s} className="mb-14">
              <div className="flex items-center justify-between mb-5 border-b border-slate-200 pb-3">
                <div className="h-7 w-32 md:w-40 bg-slate-200 rounded animate-pulse" />
                <div className="h-5 w-20 bg-slate-200 rounded animate-pulse" />
              </div>
              <SliderSkeleton />
            </section>
          ))}

        {!loading && error && (
          <p className="text-center py-12 text-red-600">{error}</p>
        )}

        {!loading &&
          !error &&
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
                <ProductSlider products={categoryProducts} />
              </section>
            )
          })}

        {!loading && !error && products.length === 0 && (
          <p className="text-center py-12 text-slate-500">
            এই মুহূর্তে কোনো পণ্য নেই।
          </p>
        )}

        {!loading && !error && products.length > 0 && (
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