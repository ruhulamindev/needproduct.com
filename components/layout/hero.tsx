"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const bgColors = [
  "from-red-900 via-rose-800 to-orange-900",        // Premium Red Gradient
  "from-blue-900 via-indigo-800 to-purple-900",     // Corporate Blue-Purple Gradient
  "from-yellow-700 via-amber-600 to-orange-700",    // Luxury Golden-Yellow Gradient
]

const images = [
  "/images/discount-1.jpeg",
  "/images/discount-2.jpeg",
  "/images/discount-3.jpeg",
]

export default function HeroSection() {
  const [currentBg, setCurrentBg] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)

  // Background color change every 8 sec
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgColors.length)
    }, 8000)
    return () => clearInterval(bgInterval)
  }, [])

  // Image slide every 4 sec
  useEffect(() => {
    const imgInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(imgInterval)
  }, [])

  return (
<div
  className={`relative overflow-hidden transition-colors duration-1000 bg-gradient-to-r ${bgColors[currentBg]} 
  pt-15 md:h-[600px] md:pt-0`}
>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:h-full">
        {/* Left Side - Text Content */}
        <div className="text-white max-w-lg text-center md:text-left mt-8 md:mt-0">
          {/* Company Name */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            NeedProduct
            {/* <br />
            Company */}
          </h1>

          {/* Discount Offer */}
          <div className="text-2xl font-bold text-yellow-300 mb-4">
            <span className="text-yellow-400">20% OFF</span> with coupon code : AB72CD
          </div>

          {/* Premium Collection */}
          <h2 className="text-3xl md:text-3xl font-bold mb-4 leading-tight">
            Premium
            <br />
            Collection
          </h2>

          {/* Shop Now Button */}
          <Link href="/shop" className="block mb-8 md:mb-0">
          <Button className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 
            text-white font-semibold text-lg px-10 py-6 rounded-xl shadow-lg 
            hover:from-purple-600 hover:via-pink-600 hover:to-red-600 
            transition-all duration-300 transform hover:scale-105">
            SHOP NOW
          </Button>

          </Link>
        </div>

        {/* Right Side - Image Slider */}
        <div className="relative mt-8 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src={images[currentImage]}
            alt="Hero Slide"
            className="w-[350px] md:w-[450px] h-auto rounded-xl shadow-lg transition-opacity duration-1000"
          />
        </div>
      </div>
    </div>
  )
}
