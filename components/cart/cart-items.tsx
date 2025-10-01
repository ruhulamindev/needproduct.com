"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export default function CartItems() {
  const { items, removeItem, updateQuantity } = useCart()

  if (items.length === 0) {
    return <p>Your cart is empty.</p>
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 border p-4 rounded shadow-sm">
          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
          <div className="flex-1">
            <h4 className="text-lg font-semibold">{item.name}</h4>
            <p className="text-sm text-gray-600">৳ {item.price.toFixed(2)}</p>
            {item.size && <p className="text-sm">Size: {item.size}</p>}
            {item.color && <p className="text-sm">Color: {item.color}</p>}
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="px-2 py-1 bg-gray-200 rounded"
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="px-3">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">৳ {(item.price * item.quantity).toFixed(2)}</p>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
