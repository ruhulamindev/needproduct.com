"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

type Product = {
  id: string
  name: string
  category: string
  image: string
}

type Category = {
  id: string
  title: string
  image: string
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)          // ✅ নতুন
  const [error, setError] = useState<string | null>(null) // ✅ নতুন

  const scrollRef = useRef<HTMLDivElement>(null)
  const isPausedRef = useRef(false)
  const animationRef = useRef<number | null>(null)

  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const startScrollRef = useRef(0)

  const SPEED = 0.5

  // Load categories
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch("/data/products.json")
        if (!res.ok) throw new Error("Failed to load")

        const products: Product[] = await res.json()

        const uniqueCategories = Array.from(
          new Map(
            products.map((product) => [
              product.category,
              {
                id: product.category,
                title: product.category,
                image: product.image,
              },
            ])
          ).values()
        )

        setCategories(uniqueCategories)
      } catch (err) {
        console.error("Failed to load products:", err)
        setError("Categories লোড করা যায়নি।")
      } finally {
        setLoading(false) // ✅ সফল হোক বা ব্যর্থ, loading শেষ
      }
    }

    loadProducts()
  }, [])

  // Auto-scroll loop
  useEffect(() => {
    if (categories.length === 0) return

    const el = scrollRef.current
    if (!el) return

    const step = () => {
      if (!isPausedRef.current && !isDraggingRef.current && el) {
        el.scrollLeft += SPEED
        const half = el.scrollWidth / 2
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half
        }
      }
      animationRef.current = requestAnimationFrame(step)
    }

    animationRef.current = requestAnimationFrame(step)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [categories])

  // ===== Drag / Swipe (mouse) =====
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true
    isPausedRef.current = true
    startXRef.current = e.pageX
    startScrollRef.current = scrollRef.current?.scrollLeft || 0
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return
    e.preventDefault()
    const walk = e.pageX - startXRef.current
    scrollRef.current.scrollLeft = startScrollRef.current - walk
  }

  const endDrag = () => {
    isDraggingRef.current = false
  }

  // ===== Drag / Swipe (touch) =====
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true
    isPausedRef.current = true
    startXRef.current = e.touches[0].pageX
    startScrollRef.current = scrollRef.current?.scrollLeft || 0
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return
    const walk = e.touches[0].pageX - startXRef.current
    scrollRef.current.scrollLeft = startScrollRef.current - walk
  }

  const handleTouchEnd = () => {
    isDraggingRef.current = false
    isPausedRef.current = false
  }

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-slate-800 mb-12">
          Browse Our Categories
        </h2>

        {/* ===== Loading Skeleton ===== */}
        {loading && (
          <div className="flex gap-6 overflow-hidden">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="min-w-[180px] md:min-w-[200px] lg:min-w-[220px] bg-white rounded-xl shadow-lg overflow-hidden flex-shrink-0"
              >
                <div className="h-36 md:h-40 bg-slate-200 animate-pulse" />
                <div className="p-4">
                  <div className="h-5 bg-slate-200 rounded animate-pulse mx-auto w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== Error ===== */}
        {!loading && error && (
          <p className="text-center text-red-600">{error}</p>
        )}

        {/* ===== Empty ===== */}
        {!loading && !error && categories.length === 0 && (
          <p className="text-center text-slate-500">
            এখন কোনো category নেই।
          </p>
        )}

        {/* ===== Categories Marquee ===== */}
        {!loading && !error && categories.length > 0 && (
          <div
            ref={scrollRef}
            onMouseEnter={() => (isPausedRef.current = true)}
            onMouseLeave={() => {
              endDrag()
              isPausedRef.current = false
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={endDrag}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="overflow-x-hidden cursor-grab active:cursor-grabbing select-none"
          >
            <div className="flex gap-6 w-max">
              {[...categories, ...categories].map((cat, idx) => (
                <Link
                  key={idx}
                  href={`/shop?category=${encodeURIComponent(cat.id)}`}
                  onClick={(e) => {
                    if (
                      Math.abs(
                        (scrollRef.current?.scrollLeft || 0) -
                          startScrollRef.current
                      ) > 5
                    ) {
                      e.preventDefault()
                    }
                  }}
                  draggable={false}
                  className="min-w-[180px] md:min-w-[200px] lg:min-w-[220px] bg-white rounded-xl shadow-lg overflow-hidden flex-shrink-0 group"
                >
                  <div className="h-36 md:h-40 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      draggable={false}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4 text-center">
                    <h3 className="font-bold text-lg text-slate-800 capitalize">
                      {cat.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}