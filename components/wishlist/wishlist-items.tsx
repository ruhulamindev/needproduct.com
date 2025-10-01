"use client"

import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Trash2, ShoppingCart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function WishlistItems() {
  const { items, removeItem } = useWishlist()
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const handleRemoveFromWishlist = (id: string, name: string) => {
    removeItem(id)
    toast({
      title: "Removed from wishlist",
      description: `${name} has been removed from your wishlist.`,
    })
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">💝</div>
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Your wishlist is empty</h2>
        <p className="text-slate-600 mb-6">Start adding items you love to your wishlist!</p>
        <Link href="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <Link href={`/product/${item.id}`}>
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </Link>

          <div className="p-4">
            <Link href={`/product/${item.id}`}>
              <h3 className="font-semibold text-slate-800 mb-2 hover:text-slate-600 transition-colors">{item.name}</h3>
            </Link>

            <div className="flex items-center space-x-2 mb-4">
              <span className="text-lg font-bold text-slate-800">৳{item.price}</span>
              {item.originalPrice && <span className="text-sm text-gray-500 line-through">৳{item.originalPrice}</span>}
            </div>

            <div className="flex space-x-2">
              <Button onClick={() => handleAddToCart(item)} className="flex-1" size="sm">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button onClick={() => handleRemoveFromWishlist(item.id, item.name)} variant="outline" size="sm">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
