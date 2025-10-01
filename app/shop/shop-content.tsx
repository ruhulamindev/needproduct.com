"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import ProductCard from "@/components/product/product-card"
import { products } from "@/data/products"

export default function ShopPageContent() {
  const searchParams = useSearchParams()
  const [category, setCategory] = useState("")

  useEffect(() => {
    setCategory(searchParams.get("category") || "")
  }, [searchParams])

  const filteredProducts = category
    ? products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      )
    : products

  const categories = Array.from(new Set(products.map((p) => p.category)))

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* <h1 className="text-3xl font-bold mb-6">Shop</h1> */}

      <div className="flex flex-wrap gap-3 mb-8">
        <Link
          href="/shop"
          className={`px-4 py-2 rounded border transition-colors ${
            category === "" ? "bg-blue-600 text-white" : "bg-white text-slate-800"
          } hover:bg-blue-600 hover:text-white`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/shop?category=${encodeURIComponent(cat)}`}
            className={`px-4 py-2 rounded border transition-colors ${
              category.toLowerCase() === cat.toLowerCase()
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-800"
            } hover:bg-blue-600 hover:text-white`}
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No products found in this category.
          </p>
        )}
      </div>
    </main>
  )
}
