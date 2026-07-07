"use client"

import { Star } from "lucide-react"

export type Filters = {
  category: string
  maxPrice: number
  minRating: number
  onlyDiscount: boolean
  onlyInStock: boolean
  sort: string
}

type Props = {
  categories: string[]
  categoryCounts: Record<string, number>
  priceCeiling: number
  filters: Filters
  onChange: (patch: Partial<Filters>) => void
  onReset: () => void
}

export default function ShopFilters({
  categories,
  categoryCounts,
  priceCeiling,
  filters,
  onChange,
  onReset,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Filters</h3>
        <button
          onClick={onReset}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Sort */}
      <div>
        <h4 className="font-medium text-slate-700 mb-2 text-sm">Sort By</h4>
        <select
          value={filters.sort}
          onChange={(e) => onChange({ sort: e.target.value })}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="discount">Biggest Discount</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <h4 className="font-medium text-slate-700 mb-2 text-sm">Category</h4>
        <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
          <button
            onClick={() => onChange({ category: "" })}
            className={`w-full text-left px-3 py-1.5 rounded text-sm capitalize transition ${
              filters.category === ""
                ? "bg-red-600 text-white"
                : "hover:bg-slate-100 text-slate-700"
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onChange({ category: cat })}
              className={`w-full flex justify-between items-center px-3 py-1.5 rounded text-sm capitalize transition ${
                filters.category.toLowerCase() === cat.toLowerCase()
                  ? "bg-red-600 text-white"
                  : "hover:bg-slate-100 text-slate-700"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-xs ${
                  filters.category.toLowerCase() === cat.toLowerCase()
                    ? "text-white/80"
                    : "text-slate-400"
                }`}
              >
                {categoryCounts[cat] ?? 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="font-medium text-slate-700 mb-2 text-sm">
          Max Price:{" "}
          <span className="text-red-600 font-semibold">৳{filters.maxPrice}</span>
        </h4>
        <input
          type="range"
          min={0}
          max={priceCeiling}
          step={10}
          value={filters.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-red-600"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>৳0</span>
          <span>৳{priceCeiling}</span>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-medium text-slate-700 mb-2 text-sm">Minimum Rating</h4>
        <div className="flex gap-1">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => onChange({ minRating: r })}
              className={`flex items-center gap-0.5 px-2 py-1 rounded border text-xs transition ${
                filters.minRating === r
                  ? "bg-red-600 text-white border-red-600"
                  : "border-slate-300 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {r === 0 ? "All" : (
                <>
                  {r}
                  <Star className="w-3 h-3 fill-current" />+
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.onlyDiscount}
            onChange={(e) => onChange({ onlyDiscount: e.target.checked })}
            className="accent-red-600 w-4 h-4"
          />
          শুধু Discount পণ্য
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.onlyInStock}
            onChange={(e) => onChange({ onlyInStock: e.target.checked })}
            className="accent-red-600 w-4 h-4"
          />
          শুধু In Stock পণ্য
        </label>
      </div>
    </div>
  )
}