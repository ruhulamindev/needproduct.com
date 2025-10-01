"use client"

import { useCart } from "@/contexts/cart-context"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Submit logic (API call, etc.)
    console.log("Submitting order:", {
      cart: items,
      total,
      billing: formData,
    })

    clearCart()
    alert("Order placed successfully!")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-3xl font-bold mb-8 text-slate-800 text-center">Checkout</h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Billing & Shipping Address */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-2">Billing & Shipping</h3>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
              <textarea
                name="address"
                placeholder="Full Address"
                required
                value={formData.address}
                onChange={handleChange}
                rows={4}
                className="w-full border px-4 py-2 rounded"
              />
            </div>

            {/* Payment & Summary */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-2">Payment & Summary</h3>

              <select
                name="paymentMethod"
                required
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              >
                <option value="">Select Payment Method</option>
                <option value="Stripe">Stripe</option>
                <option value="PayPal">PayPal</option>
                <option value="CashOnDelivery">Cash on Delivery</option>
              </select>

              <div className="border rounded p-4 bg-gray-50 space-y-2">
                <h4 className="font-medium mb-2">Items:</h4>
                <ul className="space-y-1 text-sm">
                  {items.map(item => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.name} × {item.quantity}</span>
                      <span>৳ {(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t pt-3 mt-2 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>৳ {total.toFixed(2)}</span>
                </div>
              </div>

              <Button type="submit" className="w-full mt-2">
                Submit Order
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
