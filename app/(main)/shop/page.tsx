"use client"

import dynamic from "next/dynamic"

const ShopPageContent = dynamic(() => import("./shop-content"), {
  ssr: false,
})

export default function ShopPage() {
  return <ShopPageContent />
}