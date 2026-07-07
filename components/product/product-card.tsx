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
import { toast } from "@/hooks/use-toast"

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlist()
  const { addItem: addCompare } = useCompare()
  const { user } = useAuth()

  const [wishlisted, setWishlisted] = useState(false)

  useEffect(() => {
    setWishlisted(isInWishlist(product.id))
  }, [isInWishlist, product.id])

  // ===== Discount হিসাব (% থেকে) =====
  const discount = product.discount ?? 0
  const hasDiscount = discount > 0

  // JSON-এর price = আসল দাম; discount বাদ দিয়ে final দাম
  const finalPrice = hasDiscount
    ? Math.round(product.price - (product.price * discount) / 100)
    : product.price

  // ===== Stock check =====
  // stock 0 হলে বা inStock false হলে — out of stock
  const inStock = (product.stock ?? 0) > 0 && product.inStock !== false

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
      price: finalPrice, // ছাড়ের পরের দাম cart-এ যাবে
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
        price: finalPrice,
        image: product.image,
        originalPrice: hasDiscount ? product.price : undefined,
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
      price: product.price,        // 👈 আসল দাম (finalPrice না)
      discount: product.discount,  // 👈 discount আলাদা করে পাঠাচ্ছি
      image: product.image,
      category: product.category,
      rating: product.rating ?? 4,
      reviews: product.reviews ?? 10,
      inStock,
    })
    toast({
      title: "Added to Compare",
      description: `${product.name} has been added to compare.`,
    })
  }

  return (
    <div className="relative group bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Discount Badge — discount থাকলেই */}
      {hasDiscount && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">
          -{discount}%
        </div>
      )}

      {/* Out of Stock Badge */}
      {!inStock && (
        <div className="absolute top-2 left-2 bg-slate-700 text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">
          Out of Stock
        </div>
      )}

      {/* Wishlist & Compare */}
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

      {/* Image */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative w-full h-40 md:h-44">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="p-3 flex flex-col flex-grow">
        {/* Name */}
        <Link href={`/product/${product.id}`}>
          <h2 className="text-sm md:text-base font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
            {product.name}
          </h2>
        </Link>

        {/* Category */}
        <p className="text-slate-500 text-xs mt-0.5 capitalize">{product.category}</p>

        {/* Price Block */}
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <span className="text-green-600 font-bold text-base md:text-lg">
            ৳{finalPrice}
          </span>
          {hasDiscount && (
            <span className="text-slate-400 text-sm line-through">
              ৳{product.price}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500 text-xs mt-2">
          <Star className="w-3.5 h-3.5 fill-yellow-400" />
          <span className="text-slate-700">
            {product.rating ?? 4}{" "}
            <span className="text-slate-400">({product.reviews ?? 10})</span>
          </span>
        </div>

        {/* Stock */}
        <p className={`mt-1 text-xs font-medium ${inStock ? "text-green-600" : "text-red-600"}`}>
          {inStock ? "In Stock" : "Out of Stock"}
        </p>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`mt-3 w-full py-1.5 rounded text-sm flex items-center justify-center gap-1 transition ${
            inStock
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
          title={inStock ? "Add to Cart" : "Out of Stock"}
        >
          <ShoppingCart className="w-4 h-4" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  )
}