"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"

export default function CartSummary() {
  const { total } = useCart()
  const [coupon, setCoupon] = useState("")

  const handleApplyCoupon = () => {
    // এখানে coupon code যাচাই করে ডিসকাউন্ট অ্যাড করতে পারো
    alert(`Coupon "${coupon}" applied!`)
  }

  return (
    <aside className="border p-6 rounded shadow-sm bg-gray-50 space-y-4">
      <h3 className="text-xl font-bold mb-4">Order Summary</h3>

      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>৳ {total.toFixed(2)}</span>
      </div>

      <div className="space-y-2">
        <label htmlFor="coupon" className="text-sm font-medium">Coupon Code</label>
        <input
          id="coupon"
          type="text"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <Button
          type="button"
          className="w-full"
          onClick={handleApplyCoupon}
        >
          Apply Coupon
        </Button>
      </div>

      <div className="border-t pt-4 flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>৳ {total.toFixed(2)}</span>
      </div>

      <Link href="/checkout">
        <Button className="w-full mt-4">
          Proceed to Checkout
        </Button>
      </Link>
    </aside>
  )
}
