"use client"

import Image from "next/image"
import Link from "next/link"
import { products } from "@/lib/data/products"

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link
          href={`/product/${product.id}`}
          key={product.id}
          className="border rounded-lg p-4 hover:shadow transition"
        >
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover rounded"
          />
          <h3 className="text-lg font-semibold mt-2 text-slate-800">{product.name}</h3>
          <p className="text-sm text-slate-600">{product.description}</p>
          <div className="text-slate-800 font-bold mt-1">৳ {product.price.toFixed(2)}</div>
        </Link>
      ))}
    </div>
  )
}
