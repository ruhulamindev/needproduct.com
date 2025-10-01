"use client"

import Link from "next/link"
import { useState } from "react"

export default function CategoriesSection() {
  const categories = [
    { id: "ethnic", title: "ETHNIC", subtitle: "Traditional Collection", image: "/images/download (2).png" },
    { id: "classic", title: "TIMELESS", subtitle: "Classic Styles", image: "/images/download (2).png" },
    { id: "premium", title: "EXCLUSIVE", subtitle: "Premium Range", image: "/images/download (2).png" },
    { id: "modern", title: "MODERN", subtitle: "Contemporary Designs", image: "/images/download (2).png" },
    { id: "formal", title: "FORMAL", subtitle: "Office & Party Wear", image: "/images/download (2).png" },
    { id: "sport", title: "SPORTY", subtitle: "Athletic Styles", image: "/images/download (3).png" },
    { id: "casual", title: "CASUAL", subtitle: "Everyday Wear", image: "/images/download (3).png" },
    { id: "winter", title: "WINTER", subtitle: "Warm & Cozy", image: "/images/download (3).png" },
    { id: "summer", title: "SUMMER", subtitle: "Light & Cool", image: "/images/download (3).png" },
    { id: "party", title: "PARTY", subtitle: "Evening Wear", image: "/images/download (3).png" },
    { id: "kids", title: "KIDS", subtitle: "Fun & Colorful", image: "/images/download (3).png" },
    { id: "formal2", title: "FORMAL 2", subtitle: "Office Wear", image: "/images/download (3).png" },
    { id: "classic2", title: "CLASSIC 2", subtitle: "Timeless", image: "/images/download (3).png" },
    { id: "premium2", title: "PREMIUM 2", subtitle: "Exclusive", image: "/images/download (3).png" },
    { id: "modern2", title: "MODERN 2", subtitle: "Contemporary", image: "/images/download (3).png" },
  ]

  // ✅ State to control marquee play/pause
  const [isPaused, setIsPaused] = useState(false)

  // Handle click: pause marquee
  const handleClick = () => {
    setIsPaused(true)
  }

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-slate-800 mb-12">
          Browse Our Categories
        </h2>

        {/* Marquee Wrapper */}
        <div className="overflow-hidden relative">
          {/* Track */}
          <div
            className={`flex gap-6 ${isPaused ? "" : "animate-marquee"}`}
          >
            {/* Duplicate categories for seamless loop */}
            {[...categories, ...categories].map((cat, idx) => (
              <Link
                key={idx}
                href={`/shop?category=${cat.id}`}
                onClick={handleClick} // Stop marquee on click
                className="min-w-[180px] md:min-w-[200px] lg:min-w-[220px] bg-white rounded-xl shadow-lg overflow-hidden flex-shrink-0 group cursor-pointer"
              >
                <div className="h-36 md:h-40 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg text-slate-800">{cat.title}</h3>
                  <p className="text-sm text-gray-500">{cat.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind Custom Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          min-width: max-content;
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </section>
  )
}
