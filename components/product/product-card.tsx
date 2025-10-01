"use client"

import Image from "next/image"
import Link from "next/link"
import { Product } from "@/types/product"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCompare } from "@/contexts/compare-context"
import { useAuth } from "@/contexts/auth-context"
import { Heart, BarChart2, ShoppingCart, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "@/hooks/use-toast" // যদি তোমার project e use-toast hook থাকে

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlist()
  const { addItem: addCompare } = useCompare()
  const { user } = useAuth()

  const [wishlisted, setWishlisted] = useState(false)

  useEffect(() => {
    setWishlisted(isInWishlist(product.id))
  }, [isInWishlist, product.id])

  const hasDiscount = product.originalPrice !== undefined && product.originalPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login first to add products to cart",
        variant: "destructive",
      })
      return
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const toggleWishlist = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login first to manage wishlist",
        variant: "destructive",
      })
      return
    }

    if (wishlisted) {
      removeWishlist(product.id)
      setWishlisted(false)
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        originalPrice: product.originalPrice,
      })
      setWishlisted(true)
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  const handleCompare = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login first to compare products",
        variant: "destructive",
      })
      return
    }

    addCompare({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      originalPrice: product.originalPrice,
      category: product.category,
      rating: product.rating ?? 4,
      reviews: product.reviews ?? 10,
      inStock: product.inStock ?? true,
    })
    toast({
      title: "Added to Compare",
      description: `${product.name} has been added to compare.`,
    })
  }

  return (
    <div className="relative group bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded z-10">
          -{discountPercent}%
        </div>
      )}

      {/* Wishlist & Compare Buttons */}
      <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
        <button
          onClick={toggleWishlist}
          className="bg-white p-1 rounded-full shadow hover:bg-pink-100 transition"
          title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? "text-red-600 fill-red-600" : "text-pink-500"}`} />
        </button>
        <button
          onClick={handleCompare}
          className="bg-white p-1 rounded-full shadow hover:bg-blue-100 transition"
          title="Compare"
        >
          <BarChart2 className="w-4 h-4 text-blue-500" />
        </button>
      </div>

      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative w-full h-52">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 relative">
        <h2 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
          {product.name}
        </h2>

        {/* Add to Cart button */}
        <div className="flex justify-end mt-1 mb-2">
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-3 py-1 rounded shadow hover:bg-green-700 transition text-sm flex items-center gap-1"
            title="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>

        <p className="text-slate-600 text-sm">{product.category}</p>

        <div className="flex justify-between items-center mt-2">
          <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              <Star className="w-4 h-4 fill-yellow-400" />
              <span className="text-slate-700">
                {product.rating ?? 4} ({product.reviews ?? 10})
              </span>
            </div>
            <Link
              href={`/product/${product.id}`}
              className="text-blue-600 text-sm hover:underline"
            >
              Details
            </Link>
          </div>
        </div>

        <p className={`mt-1 text-xs font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </p>
      </div>
    </div>
  )
}
