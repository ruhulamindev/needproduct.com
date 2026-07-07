"use client"

import CompareProducts from "@/components/compare/compare-products"

export default function ComparePage() {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 py-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Compare Products</h1>
      <CompareProducts />
    </main>
  )
}