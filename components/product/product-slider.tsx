"use client"

import { useEffect, useRef, useState } from "react"
import ProductCard from "@/components/product/product-card"
import { Product } from "@/types/product"

const SPEED = 0.5 // slide গতি (বড় = দ্রুত, ছোট = ধীর)
const GAP = 16    // gap-4 = 16px (নিচের card width calc-এর সাথে মিলিয়ে রাখা)

export default function ProductSlider({ products }: { products: Product[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  const isPausedRef = useRef(false)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const startScrollRef = useRef(0)

  const [overflowing, setOverflowing] = useState(false)

  // ===== Overflow check: product গুলো container-এ এঁটে যাচ্ছে কিনা =====
  // (প্রথম card-এর width দিয়ে হিসাব — duplicate করলেও ঠিক থাকবে)
  useEffect(() => {
    const check = () => {
      const c = containerRef.current
      const t = trackRef.current
      if (!c || !t || t.children.length === 0) return

      const firstCard = t.children[0] as HTMLElement
      const singleWidth =
        products.length * firstCard.offsetWidth + (products.length - 1) * GAP

      setOverflowing(singleWidth > c.clientWidth + 4)
    }

    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [products])

  // ===== Auto-scroll loop (শুধু overflow হলে চলবে) =====
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const step = () => {
      if (overflowing && !isPausedRef.current && !isDraggingRef.current) {
        el.scrollLeft += SPEED
        const half = el.scrollWidth / 2
        if (el.scrollLeft >= half) el.scrollLeft -= half
      }
      animationRef.current = requestAnimationFrame(step)
    }

    animationRef.current = requestAnimationFrame(step)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [overflowing])

  // ===== Drag / Swipe (mouse) =====
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!overflowing) return
    isDraggingRef.current = true
    isPausedRef.current = true
    startXRef.current = e.pageX
    startScrollRef.current = containerRef.current?.scrollLeft || 0
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return
    e.preventDefault()
    const walk = e.pageX - startXRef.current
    containerRef.current.scrollLeft = startScrollRef.current - walk
  }
  const endDrag = () => {
    isDraggingRef.current = false
  }

  // ===== Drag / Swipe (touch) =====
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!overflowing) return
    isDraggingRef.current = true
    isPausedRef.current = true
    startXRef.current = e.touches[0].pageX
    startScrollRef.current = containerRef.current?.scrollLeft || 0
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return
    const walk = e.touches[0].pageX - startXRef.current
    containerRef.current.scrollLeft = startScrollRef.current - walk
  }
  const handleTouchEnd = () => {
    isDraggingRef.current = false
    isPausedRef.current = false
  }

  // overflow হলে seamless loop-এর জন্য list দুইবার
  const list = overflowing ? [...products, ...products] : products

  return (
    <div
      ref={containerRef}
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
      className={`overflow-x-hidden select-none ${
        overflowing ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <div ref={trackRef} className="flex gap-4">
        {list.map((product, idx) => (
          <div
            key={`${product.id}-${idx}`}
            // drag করার পর ভুলে click/navigate হয়ে গেলে ঠেকাও
            onClickCapture={(e) => {
              if (
                Math.abs(
                  (containerRef.current?.scrollLeft || 0) - startScrollRef.current
                ) > 5
              ) {
                e.preventDefault()
                e.stopPropagation()
              }
            }}
            className="shrink-0 w-[calc((100%-1rem)/2)] sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-4rem)/5)]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}