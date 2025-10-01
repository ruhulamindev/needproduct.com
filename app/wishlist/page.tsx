"use client"

import WishlistItems from "@/components/wishlist/wishlist-items"

export default function WishlistPage() {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 py-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">My Wishlist</h1>
      <WishlistItems />
    </main>
  )
}
