"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus } from "lucide-react"
import Link from "next/link"

export default function CartItems() {
  const { items, removeItem, updateQuantity, isLoaded } = useCart()

  if (!isLoaded) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 border p-4 rounded">
            <div className="w-20 h-20 bg-slate-200 rounded animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-1/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-xl font-semibold text-slate-800 mb-2">আপনার cart খালি</h2>
        <p className="text-slate-600 mb-4">এখনো কোনো পণ্য যোগ করা হয়নি।</p>
        <Link href="/shop"><Button variant="outline">Shop-এ ফিরে যান</Button></Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-3 sm:gap-4 border p-3 sm:p-4 rounded-lg shadow-sm">
          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded shrink-0" />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm sm:text-lg font-semibold line-clamp-1">{item.name}</h4>
            <p className="text-sm text-gray-600">৳{item.price}</p>
            <div className="mt-2 flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50" disabled={item.quantity <= 1}>
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 font-medium">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 bg-gray-200 rounded hover:bg-gray-300">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <p className="font-semibold text-sm sm:text-base">৳{item.price * item.quantity}</p>
            <Button variant="destructive" size="sm" onClick={() => removeItem(item.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}