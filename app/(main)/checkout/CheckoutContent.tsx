"use client"

import { useCart } from "@/contexts/cart-context"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useSearchParams, useRouter } from "next/navigation"
import { validateCoupon } from "@/lib/coupons"
import { Truck, MessageCircle } from "lucide-react"

// 🔴 তোমার WhatsApp নম্বর
const WHATSAPP = "8801789011141"

const DELIVERY = {
  dhaka: 60,
  outside: 120,
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const searchParams = useSearchParams()
  const router = useRouter()

  const couponCode = searchParams.get("coupon") || ""
  const couponResult = couponCode ? validateCoupon(couponCode, total) : null
  const discount = couponResult?.valid ? couponResult.discount : 0

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    deliveryZone: "",
    paymentMethod: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const deliveryCharge =
    formData.deliveryZone === "dhaka"
      ? DELIVERY.dhaka
      : formData.deliveryZone === "outside"
      ? DELIVERY.outside
      : 0

  const grandTotal = Math.max(0, total - discount) + deliveryCharge

  const canSubmit =
    formData.name &&
    formData.phone &&
    formData.address &&
    formData.deliveryZone &&
    formData.paymentMethod &&
    items.length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let text = `*নতুন অর্ডার — NeedProduct*%0A%0A`
    text += `*গ্রাহক:* ${formData.name}%0A`
    text += `*ফোন:* ${formData.phone}%0A`
    text += `*ঠিকানা:* ${formData.address}%0A`
    text += `*এলাকা:* ${formData.deliveryZone === "dhaka" ? "ঢাকা" : "ঢাকার বাইরে"}%0A%0A`
    text += `*পণ্য:*%0A`
    items.forEach((item, i) => {
      text += `${i + 1}. ${item.name} — ${item.quantity} × ৳${item.price} = ৳${item.price * item.quantity}%0A`
    })
    text += `%0ASubtotal: ৳${total}`
    if (discount > 0) text += `%0ADiscount (${couponCode}): -৳${discount}`
    text += `%0ADelivery: ৳${deliveryCharge}`
    text += `%0A*সর্বমোট: ৳${grandTotal}*`
    text += `%0A%0A*পেমেন্ট:* ক্যাশ অন ডেলিভারি`

    // ১. WhatsApp খুলবে (order পাঠাবে)
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank")

    // ২. cart খালি করবে (order সম্পন্ন)
    clearCart()

    // ৩. home page-এ পাঠাবে
    router.push("/")
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-5xl mb-4">🛒</div>
        <p className="text-slate-600 mb-4">আপনার cart খালি।</p>
        <Button className="bg-red-600 hover:bg-red-700">
          <a href="/shop">Shop-এ যান</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold mb-8 text-slate-800 text-center">
          Checkout
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left — Billing */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-2">গ্রাহকের তথ্য</h3>

            <input
              type="text"
              name="name"
              placeholder="পুরো নাম *"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="ফোন নম্বর *"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <textarea
              name="address"
              placeholder="সম্পূর্ণ ঠিকানা *"
              required
              value={formData.address}
              onChange={handleChange}
              rows={4}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <div>
              <label className="text-sm font-medium block mb-1">ডেলিভারি এলাকা *</label>
              <select
                name="deliveryZone"
                required
                value={formData.deliveryZone}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">এলাকা নির্বাচন করুন</option>
                <option value="dhaka">ঢাকার ভেতরে — ৳{DELIVERY.dhaka}</option>
                <option value="outside">ঢাকার বাইরে — ৳{DELIVERY.outside}</option>
              </select>
            </div>
          </div>

          {/* Right — Payment & Summary */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-2">পেমেন্ট ও সারাংশ</h3>

            <div>
              <label className="text-sm font-medium block mb-1">পেমেন্ট পদ্ধতি *</label>
              <select
                name="paymentMethod"
                required
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">পদ্ধতি নির্বাচন করুন</option>
                <option value="cod">ক্যাশ অন ডেলিভারি</option>
              </select>
            </div>

            <div className="border rounded p-4 bg-gray-50 space-y-2">
              <h4 className="font-medium mb-2">পণ্যসমূহ:</h4>
              <ul className="space-y-1 text-sm">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span className="line-clamp-1">{item.name} × {item.quantity}</span>
                    <span>৳{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t pt-2 mt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳{total}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({couponCode})</span>
                    <span>-৳{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>
                    {formData.deliveryZone ? `৳${deliveryCharge}` : "— এলাকা নির্বাচন করুন"}
                  </span>
                </div>
              </div>

              <div className="border-t pt-3 mt-2 flex justify-between font-bold text-lg">
                <span>সর্বমোট:</span>
                <span className="text-green-600">৳{grandTotal}</span>
              </div>
            </div>

            {canSubmit ? (
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp-এ অর্ডার নিশ্চিত করুন
              </Button>
            ) : (
              <p className="text-center text-sm text-slate-400 border border-dashed rounded py-3">
                সব তথ্য ও পেমেন্ট পদ্ধতি পূরণ করলে অর্ডার বাটন আসবে
              </p>
            )}

            <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
              <Truck className="w-4 h-4 text-green-600" />
              পণ্য হাতে পেয়ে টাকা পরিশোধ করুন
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}