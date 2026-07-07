"use client"

import Image from "next/image"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Trash2, ShoppingCart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function WishlistItems() {
  const { items, removeItem, clearWishlist, isLoaded } = useWishlist()
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleMoveToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
    removeItem(item.id)
    toast({
      title: "Cart-এ যোগ হয়েছে",
      description: `${item.name} cart-এ যোগ করা হয়েছে।`,
    })
  }

  const handleRemove = (id: string, name: string) => {
    removeItem(id)
    toast({
      title: "Wishlist থেকে সরানো হয়েছে",
      description: `${name} সরিয়ে ফেলা হয়েছে।`,
    })
  }

  // ===== Loading (refresh-এর সময় localStorage পড়া পর্যন্ত) =====
  if (!isLoaded) {
    return (
      <>
        <h1 className="text-3xl font-bold text-slate-800 mb-8">My Wishlist</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="h-40 md:h-44 bg-slate-200 animate-pulse" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
                <div className="h-8 bg-slate-200 rounded animate-pulse mt-2" />
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }

  // ===== Empty state =====
  if (items.length === 0) {
    return (
      <>
        <h1 className="text-3xl font-bold text-slate-800 mb-8">My Wishlist</h1>
        <div className="text-center py-16">
          <div className="text-6xl mb-4">💝</div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            আপনার wishlist খালি
          </h2>
          <p className="text-slate-600 mb-6">
            পছন্দের পণ্য গুলো এখানে যোগ করুন!
          </p>
          <Link href="/shop">
            <Button className="bg-red-600 hover:bg-red-700">
              কেনাকাটা শুরু করুন
            </Button>
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          My Wishlist{" "}
          <span className="text-lg font-medium text-slate-500">
            ({items.length})
          </span>
        </h1>
        <button
          onClick={() => {
            clearWishlist()
            toast({ title: "Wishlist খালি করা হয়েছে" })
          }}
          className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((item) => {
          const hasDiscount =
            item.originalPrice && item.originalPrice > item.price
          const discountPercent = hasDiscount
            ? Math.round(
                ((item.originalPrice - item.price) / item.originalPrice) * 100
              )
            : 0

          return (
            <div
              key={item.id}
              className="relative bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow overflow-hidden"
            >
              {hasDiscount && (
                <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  -{discountPercent}%
                </div>
              )}

              <Link href={`/product/${item.id}`}>
                <div className="relative w-full h-40 md:h-44">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </Link>

              <div className="p-3">
                <Link href={`/product/${item.id}`}>
                  <h3 className="font-semibold text-sm md:text-base text-slate-800 mb-1 hover:text-red-600 transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base font-bold text-green-600">
                    ৳{item.price}
                  </span>
                  {hasDiscount && (
                    <span className="text-xs text-slate-400 line-through">
                      ৳{item.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <ShoppingCart className="w-4 h-4 md:mr-1" />
                    <span className="hidden md:inline">Add</span>
                  </Button>
                  <Button
                    onClick={() => handleRemove(item.id, item.name)}
                    variant="outline"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}