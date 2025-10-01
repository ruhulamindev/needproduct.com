"use client"

import { useCompare } from "@/contexts/compare-context"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Trash2, ShoppingCart, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function CompareProducts() {
  const { items, removeItem, clearCompare } = useCompare()
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

  const handleRemoveFromCompare = (id: string, name: string) => {
    removeItem(id)
    toast({
      title: "Removed from comparison",
      description: `${name} has been removed from comparison.`,
    })
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📊</div>
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">No products to compare</h2>
        <p className="text-slate-600 mb-6">
          Add products to compare their features and prices!
        </p>
        <Link href="/shop">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Return to Shop
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-slate-600">
          Comparing {items.length} product{items.length > 1 ? "s" : ""}
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
                      <h3 className="font-medium text-slate-800 hover:text-slate-600 transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <Button
                      onClick={() => handleRemoveFromCompare(item.id, item.name)}
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
            {/* Price Row */}
            <tr className="border-b">
              <td className="p-4 font-medium text-slate-800">Price</td>
              {items.map((item) => (
                <td key={item.id} className="p-4 text-center">
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-slate-800">৳{item.price}</div>
                    {item.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        ৳{item.originalPrice}
                      </div>
                    )}
                  </div>
                </td>
              ))}
            </tr>

            {/* Rating Row */}
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

            {/* Category Row */}
            <tr className="border-b">
              <td className="p-4 font-medium text-slate-800">Category</td>
              {items.map((item) => (
                <td key={item.id} className="p-4 text-center capitalize text-slate-600">
                  {item.category}
                </td>
              ))}
            </tr>

            {/* Availability Row */}
            <tr className="border-b">
              <td className="p-4 font-medium text-slate-800">Availability</td>
              {items.map((item) => (
                <td key={item.id} className="p-4 text-center">
                  <span
                    className={`text-sm ${
                      item.inStock ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
              ))}
            </tr>

            {/* Action Row */}
            <tr>
              <td className="p-4 font-medium text-slate-800">Action</td>
              {items.map((item) => (
                <td key={item.id} className="p-4 text-center">
                  <Button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock}
                    size="sm"
                    className="w-full"
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
