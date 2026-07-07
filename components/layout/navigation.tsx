"use client"

import {
  Heart,
  User,
  ShoppingCart,
  Menu,
  X,
  BarChart3,
  Search,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCompare } from "@/contexts/compare-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/shop", label: "SHOP" },
  { href: "/about", label: "ABOUT US" },
  { href: "/contact", label: "CONTACT US" },
  { href: "/request", label: "REQUEST" },
]

// SearchBar — live search সহ, clear button
function SearchBar({
  value,
  onChange,
  onSubmit,
  onClear,
  className = "",
}: {
  value: string
  onChange: (v: string) => void
  onSubmit: (e: React.FormEvent) => void
  onClear: () => void
  className?: string
}) {
  return (
    <form onSubmit={onSubmit} className={className}>
      <div className="relative w-full">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search products..."
          className="w-full border border-slate-300 rounded-full py-2 pl-4 pr-16 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />

        {value && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="absolute right-9 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-slate-500" />
          </button>
        )}

        <button
          type="submit"
          aria-label="Search"
          className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <Search className="w-4 h-4 text-slate-600" />
        </button>
      </div>
    </form>
  )
}

// UserMenu — শুধু Profile (login থাকলে), নাহলে Login/Register
function UserMenu({ user }: { user: any }) {
  const links = user
    ? [{ href: "/profile", label: "Profile" }]
    : [
        { href: "/login", label: "Login" },
        { href: "/register", label: "Register" },
      ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Account menu"
          className="p-2 rounded-full border border-slate-300 hover:bg-slate-50 transition-colors"
        >
          <User className="w-5 h-5 text-slate-600" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {links.map((link) => (
          <DropdownMenuItem key={link.href} asChild>
            <Link href={link.href}>{link.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const { items } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { items: compareItems } = useCompare()
  const { user } = useAuth()

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const isShopPage = pathname === "/shop"

  // URL → input sync
  useEffect(() => {
    if (isShopPage) {
      setSearchQuery(searchParams.get("search") || "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShopPage])

  // LIVE SEARCH — debounced 300ms
  useEffect(() => {
    if (!isShopPage) return

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      const q = searchQuery.trim()

      if (q) params.set("search", q)
      else params.delete("search")

      const query = params.toString()
      router.replace(query ? `/shop?${query}` : "/shop", { scroll: false })
    }, 300)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, isShopPage])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    const q = searchQuery.trim()
    if (q) params.set("search", q)
    else params.delete("search")
    const query = params.toString()
    router.replace(query ? `/shop?${query}` : "/shop", { scroll: false })
    setMobileMenuOpen(false)
  }

  const handleClear = () => {
    setSearchQuery("")
  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* ===== Main Bar ===== */}
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="text-xl md:text-2xl font-bold text-slate-800">
              <span className="text-slate-800">N</span>eedProduct
            </div>
          </Link>

          {/* Desktop Search — শুধু shop page-এ */}
          {isShopPage && (
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSubmit={handleSearch}
              onClear={handleClear}
              className="hidden md:flex flex-1 max-w-md"
            />
          )}

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-3 shrink-0">
            <Link
              href="/wishlist"
              aria-label="Wishlist"
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
              aria-label="Compare"
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
              aria-label="Cart"
              className="p-2 rounded-full border border-slate-300 hover:bg-slate-50 relative transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-slate-600" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-slate-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <UserMenu user={user} />
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center space-x-2 shrink-0">
            <Link
              href="/request"
              className="p-2 rounded-full border border-slate-300 hover:bg-slate-50"
            >
              <span className="text-slate-800 font-medium text-sm">REQ</span>
            </Link>

            <Link
              href="/cart"
              aria-label="Cart"
              className="p-2 rounded-full border border-slate-300 hover:bg-slate-50 relative"
            >
              <ShoppingCart className="w-5 h-5 text-slate-600" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-slate-800 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <UserMenu user={user} />

            <Button
              variant="ghost"
              size="icon"
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* ===== Mobile Search Row — শুধু shop page-এ ===== */}
        {isShopPage && (
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={handleSearch}
            onClear={handleClear}
            className="md:hidden pb-3"
          />
        )}

        {/* ===== Desktop Nav Links ===== */}
        <div className="hidden md:flex justify-center gap-8 border-t border-slate-100">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`py-3 font-medium text-sm transition-colors border-b-2 ${
                  isActive
                    ? "text-slate-900 border-slate-800"
                    : "text-slate-600 border-transparent hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* ===== Mobile Menu Drawer ===== */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-medium py-2 px-4 rounded-lg transition-colors ${
                      isActive
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-800 hover:bg-slate-50 hover:text-slate-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}

              <div className="border-t border-slate-200 pt-3 mt-3 space-y-1">
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center text-slate-800 hover:bg-slate-50 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  <Heart className="w-5 h-5 mr-3" />
                  Wishlist ({wishlistItems.length})
                </Link>
                <Link
                  href="/compare"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center text-slate-800 hover:bg-slate-50 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  <BarChart3 className="w-5 h-5 mr-3" />
                  Compare ({compareItems.length})
                </Link>

                {/* User — শুধু Profile / Login-Register */}
                {(user
                  ? [{ href: "/profile", label: "Profile" }]
                  : [
                      { href: "/login", label: "Login" },
                      { href: "/register", label: "Register" },
                    ]
                ).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center text-slate-800 hover:bg-slate-50 font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    <User className="w-5 h-5 mr-3" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}