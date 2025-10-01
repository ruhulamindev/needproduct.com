"use client"

import CartItems from "@/components/cart/cart-items"
import CartSummary from "@/components/cart/cart-summary"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 sm:mb-8">
          Shopping Cart
        </h1>

        {/* Shop এ নিয়ে যাওয়ার বাটন */}
<div className="mb-6 text-center">
  <Link href="/shop" passHref>
    <Button
      as="a"
      className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      Continue Shopping
    </Button>
  </Link>
</div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <CartItems />
          </div>
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </main>
    </div>
  )
}
