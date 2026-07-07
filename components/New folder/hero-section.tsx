import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <div className="relative h-[600px] bg-gradient-to-r from-slate-800 to-slate-700 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage: "url('https://admin.uskunalar.uz/media/maykali_paket.png')",
          // backgroundImage: "url('/placeholder.svg?height=600&width=1200')",
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-lg">
          {/* Logo */}
          <div className="mb-8">
            <div className="text-2xl font-bold text-white mb-2">
              {/* <span className="text-white"></span> */}
              <span className="text-white">G</span>lobalSmart
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl font-bold mb-4 leading-tight">
            GlobalSmart
            <br />
            Company
          </h1>

          {/* Subheading */}
          <h2 className="text-3xl font-light mb-6 text-slate-200">
            premium
            <br />
            Collection
          </h2>

          {/* Description */}
          <p className="text-sm text-slate-300 mb-8 max-w-md leading-relaxed">
            "Discover our advanced range of photocopy machines — engineered with precision and built for performance to meet the demands of the modern workspace."
          </p>

          {/* CTA Button */}
          <Link href="/shop">
            <Button className="bg-white text-slate-800 hover:bg-slate-100 px-8 py-3 text-lg font-semibold">
              SHOP NOW
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 text-white text-sm opacity-60">SALE</div>
    </div>
  )
}
