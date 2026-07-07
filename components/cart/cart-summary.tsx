"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { COUPONS, couponDisplay, validateCoupon } from "@/lib/coupons"
import { Tag, X } from "lucide-react"

export default function CartSummary() {
  const { items, total } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const [selectedCoupon, setSelectedCoupon] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState(0)
  const [appliedCode, setAppliedCode] = useState("")

  const hasCoupons = COUPONS.length > 0 // coupon না থাকলে section দেখাবে না

  const handleApplyCoupon = () => {
    if (!selectedCoupon) {
      toast({ title: "একটি কুপন নির্বাচন করুন", variant: "destructive" })
      return
    }
    const result = validateCoupon(selectedCoupon, total)
    if (result.valid) {
      setAppliedDiscount(result.discount)
      setAppliedCode(selectedCoupon)
      toast({ title: "কুপন প্রয়োগ হয়েছে ✅", description: result.message })
    } else {
      setAppliedDiscount(0)
      setAppliedCode("")
      toast({ title: "কুপন সঠিক নয়", description: result.message, variant: "destructive" })
    }
  }

  const removeCoupon = () => {
    setAppliedDiscount(0)
    setAppliedCode("")
    setSelectedCoupon("")
  }

  const afterDiscount = Math.max(0, total - appliedDiscount)

  // Checkout-এ যাওয়া — coupon code query দিয়ে পাঠাচ্ছি
  const goToCheckout = () => {
    if (items.length === 0) {
      toast({ title: "Cart খালি", variant: "destructive" })
      return
    }
    const query = appliedCode ? `?coupon=${appliedCode}` : ""
    router.push(`/checkout${query}`)
  }

  return (
    <aside className="border p-6 rounded-lg shadow-sm bg-gray-50 space-y-4 lg:sticky lg:top-24">
      <h3 className="text-xl font-bold">Order Summary</h3>

      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>৳{total}</span>
      </div>

      {/* Applied coupon */}
      {appliedDiscount > 0 && (
        <div className="flex justify-between text-sm text-green-600">
          <span className="flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            {appliedCode}
            <button onClick={removeCoupon} className="ml-1">
              <X className="w-3 h-3" />
            </button>
          </span>
          <span>-৳{appliedDiscount}</span>
        </div>
      )}

      {/* Coupon dropdown + Apply — coupon থাকলে ও এখনো apply না হলে */}
      {hasCoupons && appliedDiscount === 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Coupon Code</label>
          <div className="flex gap-2">
            {/* বাঁয়ে dropdown */}
            <select
              value={selectedCoupon}
              onChange={(e) => setSelectedCoupon(e.target.value)}
              className="flex-1 border px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">কুপন নির্বাচন করুন</option>
              {COUPONS.map((c) => (
                <option key={c.code} value={c.code}>
                  {couponDisplay(c)}
                </option>
              ))}
            </select>
            {/* ডানে Apply */}
            <Button type="button" onClick={handleApplyCoupon} variant="outline">
              Apply
            </Button>
          </div>
        </div>
      )}

      {/* Total (discount পর্যন্ত — delivery checkout-এ যোগ হবে) */}
      <div className="border-t pt-4 flex justify-between font-bold text-lg">
        <span>Total</span>
        <span className="text-green-600">৳{afterDiscount}</span>
      </div>
      <p className="text-xs text-slate-500">* ডেলিভারি চার্জ checkout-এ যোগ হবে</p>

      <Button
        onClick={goToCheckout}
        disabled={items.length === 0}
        className="w-full bg-red-600 hover:bg-red-700"
      >
        Proceed to Checkout
      </Button>
    </aside>
  )
}