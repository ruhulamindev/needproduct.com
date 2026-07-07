"use client"

import CartItems from "@/components/cart/cart-items"
import CartSummary from "@/components/cart/cart-summary"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
          Shopping Cart
        </h1>

        <div className="mb-6">
          <Button variant="outline">
            <Link href="/shop">← Continue Shopping</Link>
          </Button>
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