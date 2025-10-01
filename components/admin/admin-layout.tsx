"use client"
import React, { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Mobile Header with toggle */}
      <div className="flex justify-between items-center p-4 bg-slate-900 text-white lg:hidden">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } lg:block w-full lg:w-64 bg-slate-900 text-white p-6 space-y-4 lg:min-h-screen`}
      >
        <nav className="space-y-2">
          <Link href="/admin" className="block hover:text-blue-400">Dashboard</Link>
          <Link href="/admin/products" className="block hover:text-blue-400">Products</Link>
          <Link href="/admin/orders" className="block hover:text-blue-400">Orders</Link>
          <Link href="/admin/users" className="block hover:text-blue-400">Users</Link>
          <Link href="/admin/settings" className="block hover:text-blue-400">Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-4">
        <header className="text-2xl font-bold mb-6 border-b pb-2">Admin Dashboard</header>
        {children}
        <footer className="mt-12 text-sm text-center text-gray-500">
          &copy; 2025 LargeSoft Tech. All rights reserved.
        </footer>
      </main>
    </div>
  )
}
