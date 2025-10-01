import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
  return (
    <div className="relative h-[600px] bg-gradient-to-r from-slate-800 to-slate-700 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="Royal Attire Hero"
          fill
          className="object-cover opacity-80"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-lg">
          {/* Logo */}
          <div className="mb-8">
            <div className="text-2xl font-bold text-white mb-2">
              <span className="text-white">M</span>
              <span className="text-white">M</span> manfare
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl font-bold mb-4 leading-tight">
            ROYAL
            <br />
            ATTIRE
          </h1>

          {/* Subheading */}
          <h2 className="text-3xl font-light mb-6 text-slate-200">
            premium
            <br />
            panjabi
          </h2>

          {/* Description */}
          <p className="text-sm text-slate-300 mb-8 max-w-md leading-relaxed">
            Discover our exclusive collection of premium traditional wear. Crafted with finest materials and attention
            to detail for the modern gentleman.
          </p>

          {/* CTA Button */}
          <Button className="bg-white text-slate-800 hover:bg-slate-100 px-8 py-3 text-lg font-semibold">
            SHOP NOW
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 text-white text-sm opacity-60">SALE</div>
    </div>
  )
}
