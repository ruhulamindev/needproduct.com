"use client"

import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { products } from "@/data/products"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"

export default function ProductDetails() {
  const { id } = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const product = products.find((p) => p.id === id)
  if (!product) {
    if (typeof window !== "undefined") router.push("/404")
    return null
  }

const hasDiscount = product.originalPrice !== undefined && product.originalPrice > product.price
const discountPercent = hasDiscount
  ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
  : 0


  // যদি selectedImage না থাকে, main image দেখাবে
  const mainImage = selectedImage || product.image

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <div>
          <div className="w-full h-80 relative mb-4">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover rounded shadow"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-2">
            {[product.image, ...(product.images ?? [])].map((img, index) => (
              <div
                key={index}
                className={`w-20 h-20 relative rounded border cursor-pointer ${
                  mainImage === img ? "border-blue-600" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <Image src={img} alt={`${product.name}-${index}`} fill className="object-cover rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-3">{product.name}</h1>
          <p className="text-slate-600 mb-2">
            Category: <strong>{product.category ?? "Uncategorized"}</strong>
          </p>

          {/* Price + Discount */}
          <div className="flex items-center gap-3 mb-4">
            <p className="text-xl font-semibold text-green-600">${product.price.toFixed(2)}</p>
            {hasDiscount && (
              <p className="text-sm text-gray-500 line-through">
                ${product.originalPrice?.toFixed(2)}
              </p>
            )}
            {hasDiscount && (
              <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded">
                -{discountPercent}%
              </span>
            )}
          </div>

          <p className="text-slate-700 leading-relaxed">{product.description}</p>

          {/* Add to Cart */}
          <button
            onClick={() =>
              addItem({
                id: product.id.toString(),
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
              })
            }
            className="mt-6 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  )
}
