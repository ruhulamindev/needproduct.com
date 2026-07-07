"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const bgColors = [
  "from-red-900 via-rose-800 to-orange-900",     // Premium Red
  "from-blue-900 via-indigo-800 to-purple-900",  // Corporate Blue-Purple
  "from-yellow-700 via-amber-600 to-orange-700", // Luxury Golden
]

const images = [
  "/images/discount-1.jpeg",
  "/images/discount-2.jpeg",
  "/images/discount-3.jpeg",
]

export default function HeroSection() {
  const [currentBg, setCurrentBg] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)

  // Background gradient — প্রতি ৮ সেকেন্ডে বদলাবে
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgColors.length)
    }, 8000)
    return () => clearInterval(bgInterval)
  }, [])

  // Image slide — প্রতি ৪ সেকেন্ডে বদলাবে
  useEffect(() => {
    const imgInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(imgInterval)
  }, [])

  return (
    <div
      className={`relative overflow-hidden transition-colors duration-1000 bg-gradient-to-r ${bgColors[currentBg]}
      min-h-[480px] md:h-[500px]`}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col-reverse md:flex-row items-center justify-between gap-6 py-10 md:py-0">
        {/* Left — Text */}
        <div className="text-white max-w-lg text-center md:text-left">
          <h1 className="text-4xl md:text-6xl mt-4 md:mt-0 font-bold mb-4 leading-tight">
            NeedProduct
          </h1>

          {/* Discount Offer */}
          <div className="text-xl md:text-2xl font-bold text-yellow-300 mb-4">
            <span className="text-yellow-400">20% OFF</span> — coupon:{" "}
            <span className="tracking-wide">AB72CD</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
            Premium Collection
          </h2>

          <Link href="/shop" className="inline-block">
            <Button
              className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600
              text-white font-semibold text-lg px-10 py-6 rounded-xl shadow-lg
              hover:from-purple-600 hover:via-pink-600 hover:to-red-600
              transition-all duration-300 transform hover:scale-105"
            >
              SHOP NOW
            </Button>
          </Link>
        </div>

        {/* Right — Image Slider (crossfade) */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <div className="relative w-[300px] md:w-[450px] h-[220px] md:h-[340px]">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Offer slide ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-cover rounded-xl shadow-lg transition-opacity duration-1000 ${
                  idx === currentImage ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Dot Indicators */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentImage
                      ? "bg-white w-6"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}