"use client"

import { useCompare } from "@/contexts/compare-context"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Trash2, ShoppingCart, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

// discount % থেকে final দাম
const getFinalPrice = (price: number, discount?: number) =>
  discount && discount > 0
    ? Math.round(price - (price * discount) / 100)
    : price

export default function CompareProducts() {
  const { items, removeItem, clearCompare, isLoaded } = useCompare()
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: getFinalPrice(item.price, item.discount), // ছাড়ের পরের দাম
      image: item.image,
      quantity: 1,
    })
    toast({
      title: "Cart-এ যোগ হয়েছে",
      description: `${item.name} cart-এ যোগ করা হয়েছে।`,
    })
  }

  const handleRemove = (id: string, name: string) => {
    removeItem(id)
    toast({
      title: "Compare থেকে সরানো হয়েছে",
      description: `${name} সরিয়ে ফেলা হয়েছে।`,
    })
  }

  // ===== Loading (refresh-এ localStorage পড়া পর্যন্ত) =====
  if (!isLoaded) {
    return (
      <div className="overflow-x-auto">
        <div className="flex gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="min-w-[200px] bg-white rounded-lg shadow-sm border p-4 space-y-3">
              <div className="w-24 h-24 bg-slate-200 rounded-lg mx-auto animate-pulse" />
              <div className="h-4 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-slate-200 rounded animate-pulse mx-auto" />
              <div className="h-8 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ===== Empty =====
  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📊</div>
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">
          তুলনা করার মতো কোনো পণ্য নেই
        </h2>
        <p className="text-slate-600 mb-6">
          পণ্যের feature আর দাম তুলনা করতে products যোগ করুন!
        </p>
        <Link href="/shop">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Shop-এ ফিরে যান
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-slate-600">
          {items.length}টি পণ্য তুলনা করা হচ্ছে
        </p>
        <Button onClick={clearCompare} variant="outline" size="sm">
          Clear All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-semibold text-slate-800 w-32">Product</th>
              {items.map((item) => (
                <th key={item.id} className="text-center p-4 min-w-[200px]">
                  <div className="space-y-2">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg mx-auto"
                    />
                    <Link href={`/product/${item.id}`}>
                      <h3 className="font-medium text-slate-800 hover:text-red-600 transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <Button
                      onClick={() => handleRemove(item.id, item.name)}
                      variant="ghost"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Price */}
            <tr className="border-b">
              <td className="p-4 font-medium text-slate-800">Price</td>
              {items.map((item) => {
                const hasDiscount = (item.discount ?? 0) > 0
                const finalPrice = getFinalPrice(item.price, item.discount)
                return (
                  <td key={item.id} className="p-4 text-center">
                    <div className="space-y-1">
                      <div className="text-lg font-bold text-green-600">
                        ৳{finalPrice}
                      </div>
                      {hasDiscount && (
                        <div className="text-sm text-gray-400 line-through">
                          ৳{item.price}
                        </div>
                      )}
                    </div>
                  </td>
                )
              })}
            </tr>

            {/* Discount */}
            <tr className="border-b">
              <td className="p-4 font-medium text-slate-800">Discount</td>
              {items.map((item) => (
                <td key={item.id} className="p-4 text-center">
                  {(item.discount ?? 0) > 0 ? (
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                      -{item.discount}%
                    </span>
                  ) : (
                    <span className="text-slate-400 text-sm">—</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Rating */}
            <tr className="border-b">
              <td className="p-4 font-medium text-slate-800">Rating</td>
              {items.map((item) => (
                <td key={item.id} className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">
                      {item.rating} ({item.reviews})
                    </span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Category */}
            <tr className="border-b">
              <td className="p-4 font-medium text-slate-800">Category</td>
              {items.map((item) => (
                <td key={item.id} className="p-4 text-center capitalize text-slate-600">
                  {item.category}
                </td>
              ))}
            </tr>

            {/* Availability */}
            <tr className="border-b">
              <td className="p-4 font-medium text-slate-800">Availability</td>
              {items.map((item) => (
                <td key={item.id} className="p-4 text-center">
                  <span className={`text-sm ${item.inStock ? "text-green-600" : "text-red-600"}`}>
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
              ))}
            </tr>

            {/* Action */}
            <tr>
              <td className="p-4 font-medium text-slate-800">Action</td>
              {items.map((item) => (
                <td key={item.id} className="p-4 text-center">
                  <Button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock}
                    size="sm"
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}