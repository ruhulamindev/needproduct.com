"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Menu,
  Store,
  LogOut,
} from "lucide-react"
import { verifyAdmin, logoutAdmin } from "@/lib/admin-auth"
import AdminLogin from "./admin-login"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [authed, setAuthed] = useState(false)
  const [checked, setChecked] = useState(false) // login check শেষ হয়েছে কিনা

  const pathname = usePathname()

  // ===== শুরুতে login check =====
useEffect(() => {
    verifyAdmin().then((ok) => {   // 👈 backend-এ যাচাই
      setAuthed(ok)
      setChecked(true)
    })
  }, [])

  const handleLogout = async () => { await logoutAdmin(); setAuthed(false) }

  // check চলাকালীন কিছু দেখাবে না (flash এড়াতে)
  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        লোড হচ্ছে...
      </div>
    )
  }

  // 🔒 login না থাকলে → login page
  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />
  }

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center font-bold text-white">
          N
        </div>
        <div>
          <p className="font-bold leading-tight">NeedProduct</p>
          <p className="text-xs text-slate-400">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-red-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom links */}
      <div className="mt-8 pt-6 border-t border-slate-700 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <Store className="w-5 h-5" />
          Back to Site
        </Link>

        {/* 👇 Logout এখন button — সরাসরি logout করবে */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-slate-800 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ===== Desktop Sidebar ===== */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-white p-4 fixed h-screen">
        <SidebarContent />
      </aside>

      {/* ===== Mobile Sidebar (drawer) ===== */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-slate-900 text-white p-4 overflow-y-auto">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* ===== Main Content ===== */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Mobile Top Bar */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-slate-900 text-white sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-bold text-sm">
              N
            </div>
            <span className="font-bold">Admin Panel</span>
          </div>
          <button onClick={() => setSidebarOpen(true)} aria-label="Menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>

        {/* Footer */}
        <footer className="py-4 text-center text-xs text-slate-400 border-t border-slate-200">
          © {new Date().getFullYear()} NeedProduct. All rights reserved.
        </footer>
      </div>
    </div>
  )
}