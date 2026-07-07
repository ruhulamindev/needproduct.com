"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, useMemo } from "react"
import { SlidersHorizontal, X } from "lucide-react"
import ProductCard from "@/components/product/product-card"
import ShopFilters, { Filters } from "@/components/shop/shop-filters"
import { Product } from "@/types/product"

export default function ShopPageContent() {
  const searchParams = useSearchParams()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const [filters, setFilters] = useState<Filters>({
    category: "",
    maxPrice: 5000,
    minRating: 0,
    onlyDiscount: false,
    onlyInStock: false,
    sort: "default",
  })

  // Load products
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

  // URL → category + search sync
  useEffect(() => {
    const cat = searchParams.get("category") || ""
    const srch = searchParams.get("search") || ""
    setSearch(srch)
    setFilters((f) => ({ ...f, category: cat }))
  }, [searchParams])

  // দামের সর্বোচ্চ সীমা (slider-এর জন্য)
  const priceCeiling = useMemo(() => {
    const max = Math.max(...products.map((p) => p.price), 1000)
    return Math.ceil(max / 100) * 100
  }, [products])

  // priceCeiling বদলালে maxPrice আপডেট (শুরুতে full range)
  useEffect(() => {
    setFilters((f) => ({ ...f, maxPrice: priceCeiling }))
  }, [priceCeiling])

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  )

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [products])

  // ===== Filter + Search + Sort =====
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const discount = product.discount ?? 0
      const finalPrice =
        discount > 0
          ? Math.round(product.price - (product.price * discount) / 100)
          : product.price
      const inStock = (product.stock ?? 0) > 0 && product.inStock !== false

      const matchCategory =
        filters.category === "" ||
        product.category.toLowerCase() === filters.category.toLowerCase()

      const matchSearch =
        search === "" ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        (product.description ?? "").toLowerCase().includes(search.toLowerCase())

      const matchPrice = finalPrice <= filters.maxPrice
      const matchRating = (product.rating ?? 0) >= filters.minRating
      const matchDiscount = !filters.onlyDiscount || discount > 0
      const matchStock = !filters.onlyInStock || inStock

      return (
        matchCategory &&
        matchSearch &&
        matchPrice &&
        matchRating &&
        matchDiscount &&
        matchStock
      )
    })

    // Sort
    const getFinal = (p: Product) => {
      const d = p.discount ?? 0
      return d > 0 ? p.price - (p.price * d) / 100 : p.price
    }

    switch (filters.sort) {
      case "price-low":
        result = [...result].sort((a, b) => getFinal(a) - getFinal(b))
        break
      case "price-high":
        result = [...result].sort((a, b) => getFinal(b) - getFinal(a))
        break
      case "rating":
        result = [...result].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
        break
      case "discount":
        result = [...result].sort(
          (a, b) => (b.discount ?? 0) - (a.discount ?? 0)
        )
        break
    }

    return result
  }, [products, filters, search])

  const handleChange = (patch: Partial<Filters>) => {
    setFilters((f) => ({ ...f, ...patch }))
  }

  const handleReset = () => {
    setFilters({
      category: "",
      maxPrice: priceCeiling,
      minRating: 0,
      onlyDiscount: false,
      onlyInStock: false,
      sort: "default",
    })
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Search heading (bug fixed — এখন return-এর ভেতরে) */}
      {search && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-800">
            Search Result for:
            <span className="text-red-600"> "{search}"</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {filteredProducts.length} products found
          </p>
        </div>
      )}

      {/* Mobile Filter Button */}
      <button
        onClick={() => setShowMobileFilters(true)}
        className="lg:hidden flex items-center gap-2 mb-4 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
      </button>

      <div className="flex gap-8">
        {/* ===== Desktop Sidebar ===== */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 bg-white border border-slate-200 rounded-lg p-5">
            <ShopFilters
              categories={categories}
              categoryCounts={categoryCounts}
              priceCeiling={priceCeiling}
              filters={filters}
              onChange={handleChange}
              onReset={handleReset}
            />
          </div>
        </aside>

        {/* ===== Products ===== */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-slate-500">
              {loading ? "লোড হচ্ছে..." : `${filteredProducts.length} products`}
            </p>
          </div>

          {/* Loading Skeleton */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white border rounded-lg overflow-hidden">
                  <div className="h-40 md:h-44 bg-slate-200 animate-pulse" />
                  <div className="p-3 space-y-2">
                    <div className="h-4 bg-slate-200 rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-slate-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500 mb-3">কোনো পণ্য পাওয়া যায়নি।</p>
              <button
                onClick={handleReset}
                className="text-red-600 hover:text-red-700 font-medium text-sm"
              >
                Filter Reset করুন
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ===== Mobile Filter Drawer ===== */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          {/* Panel */}
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-xl overflow-y-auto p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-slate-800">Filters</h3>
              <button onClick={() => setShowMobileFilters(false)}>
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            <ShopFilters
              categories={categories}
              categoryCounts={categoryCounts}
              priceCeiling={priceCeiling}
              filters={filters}
              onChange={handleChange}
              onReset={handleReset}
            />
            <button
              onClick={() => setShowMobileFilters(false)}
              className="mt-6 w-full bg-red-600 text-white py-2.5 rounded-lg font-medium"
            >
              {filteredProducts.length}টি পণ্য দেখুন
            </button>
          </div>
        </div>
      )}
    </main>
  )
}