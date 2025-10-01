import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

// Context Providers
import { CartProvider } from "@/contexts/cart-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { CompareProvider } from "@/contexts/compare-context"
import { AuthProvider } from "@/contexts/auth-context"

// UI Components
import { Toaster } from "@/components/ui/toaster"

// Layout Components
import Header from "@/components/layout/header"
import Navigation from "@/components/layout/navigation"
import Footer from "@/components/layout/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GlobalSmart - Premium Traditional Machine",
  description:
    "Explore our cutting-edge collection of powerful and custom-built machines, crafted for performance, reliability, and innovation.",
  generator: "LargeSoft Tech",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <WishlistProvider>
            <CompareProvider>
              <CartProvider>
                {/* Header এবং Navigation সব পেজে থাকবে */}
                <Header />
                <Navigation />

                {/* এখানে পেজের কন্টেন্ট আসবে */}
                <main>{children}</main>

                {/* Footer সব পেজে থাকবে */}
                <Footer />

                {/* Toast Notification */}
                <Toaster />
              </CartProvider>
            </CompareProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
