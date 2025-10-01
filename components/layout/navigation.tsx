"use client"

import { Heart, User, ShoppingCart, Menu, X, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCompare } from "@/contexts/compare-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { items } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { items: compareItems } = useCompare()
  const { user } = useAuth()

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-xl md:text-2xl font-bold text-slate-800">
              <span className="text-slate-800">N</span>eedProduct
            </div>
          </Link>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex space-x-8">
            <Link href="/" className="text-slate-800 hover:text-slate-600 font-medium transition-colors">
              HOME
            </Link>
            <Link href="/shop" className="text-slate-800 hover:text-slate-600 font-medium transition-colors">
              SHOP
            </Link>
            <Link href="/about" className="text-slate-800 hover:text-slate-600 font-medium transition-colors">
              ABOUT US
            </Link>
            <Link href="/contact" className="text-slate-800 hover:text-slate-600 font-medium transition-colors">
              CONTACT US
            </Link>
            <Link href="/request" className="text-slate-800 hover:text-slate-600 font-medium transition-colors">
              REQUEST
            </Link>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/wishlist"
              className="p-2 rounded-full border border-slate-300 hover:bg-slate-50 relative transition-colors"
            >
              <Heart className="w-5 h-5 text-slate-600" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link
              href="/compare"
              className="p-2 rounded-full border border-slate-300 hover:bg-slate-50 relative transition-colors"
            >
              <BarChart3 className="w-5 h-5 text-slate-600" />
              {compareItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {compareItems.length}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="p-2 rounded-full border border-slate-300 hover:bg-slate-50 relative transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-slate-600" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-slate-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full border border-slate-300 hover:bg-slate-50 transition-colors">
                  <User className="w-5 h-5 text-slate-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user ? (
                  <>
                    <DropdownMenuItem>
                      <Link 
                        href="/profile" 
                        onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))}
                      >
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link 
                        href="/orders" 
                        onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))}
                      >
                        Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link 
                        href="/logout" 
                        onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))}
                      >
                        Logout
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Link 
                        href="/login" 
                        onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))}
                      >
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link 
                        href="/register" 
                        onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))}
                      >
                        Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

          </div>

          {/* Mobile Top Bar: Request → Cart → Profile → Menu */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Request */}
            <Link
              href="/request"
              className="p-2 rounded-full border border-slate-300 hover:bg-slate-50 relative"
            >
              <span className="text-slate-800 font-medium text-sm">REQ</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="p-2 rounded-full border border-slate-300 hover:bg-slate-50 relative"
            >
              <ShoppingCart className="w-5 h-5 text-slate-600" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-slate-800 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

              {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full border border-slate-300 hover:bg-slate-50 transition-colors">
                  <User className="w-5 h-5 text-slate-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user ? (
                  <>
                    <DropdownMenuItem>
                      <Link 
                        href="/profile" 
                        onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))}
                      >
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link 
                        href="/orders" 
                        onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))}
                      >
                        Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link 
                        href="/logout" 
                        onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))}
                      >
                        Logout
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Link 
                        href="/login" 
                        onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))}
                      >
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link 
                        href="/register" 
                        onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))}
                      >
                        Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Links */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-slate-800 hover:text-slate-600 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                HOME
              </Link>
              <Link
                href="/shop"
                className="text-slate-800 hover:text-slate-600 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                SHOP
              </Link>
              <Link
                href="/request"
                className="text-slate-800 hover:text-slate-600 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                REQUEST
              </Link>
              <Link
                href="/about"
                className="text-slate-800 hover:text-slate-600 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                ABOUT US
              </Link>
              <Link
                href="/contact"
                className="text-slate-800 hover:text-slate-600 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                CONTACT US
              </Link>

              <div className="border-t border-slate-200 pt-4 mt-4">
                <Link
                  href="/wishlist"
                  className="flex items-center text-slate-800 hover:text-slate-600 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart className="w-5 h-5 mr-3" />
                  Wishlist ({wishlistItems.length})
                </Link>
                <Link
                  href="/compare"
                  className="flex items-center text-slate-800 hover:text-slate-600 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BarChart3 className="w-5 h-5 mr-3" />
                  Compare ({compareItems.length})
                </Link>

                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center text-slate-800 hover:text-slate-600 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5 mr-3" />
                      Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="flex items-center text-slate-800 hover:text-slate-600 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    <Link
                      href="/logout"
                      className="flex items-center text-slate-800 hover:text-slate-600 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex items-center text-slate-800 hover:text-slate-600 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center text-slate-800 hover:text-slate-600 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
