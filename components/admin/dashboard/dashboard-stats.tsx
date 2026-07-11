"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Users, ShoppingBag, DollarSign, Package } from "lucide-react"

type Stats = {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalCustomers: number
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api<{ data: Stats }>("/orders/stats")
      .then((res) => setStats(res.data))
      .catch((e) => console.error("Stats load failed:", e))
      .finally(() => setLoading(false))
  }, [])

  const cards = [
    { label: "মোট বিক্রি", value: stats ? `৳${Math.round(stats.totalRevenue)}` : "—", icon: DollarSign, color: "bg-green-100 text-green-600" },
    { label: "মোট অর্ডার", value: stats?.totalOrders ?? "—", icon: ShoppingBag, color: "bg-blue-100 text-blue-600" },
    { label: "মোট পণ্য", value: stats?.totalProducts ?? "—", icon: Package, color: "bg-purple-100 text-purple-600" },
    { label: "মোট গ্রাহক", value: stats?.totalCustomers ?? "—", icon: Users, color: "bg-orange-100 text-orange-600" },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.label} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
            <div className={`inline-flex p-2.5 rounded-lg mb-3 ${stat.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            {loading ? (
              <div className="h-8 w-20 bg-slate-200 rounded animate-pulse" />
            ) : (
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            )}
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
          </div>
        )
      })}
    </div>
  )
}