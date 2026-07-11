"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { api } from "@/lib/api"

const statusStyle: Record<string, string> = {
  delivered: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  shipped: "bg-purple-100 text-purple-700",
  processing: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
}

const statusLabel: Record<string, string> = {
  delivered: "সম্পন্ন",
  pending: "অপেক্ষমাণ",
  shipped: "পাঠানো হয়েছে",
  processing: "প্রক্রিয়াধীন",
  cancelled: "বাতিল",
}

export default function RecentOrders() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api<{ data: any[] }>("/orders")
      .then((res) => setOrders(res.data.slice(0, 5))) // সর্বশেষ ৫টা
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800">সাম্প্রতিক অর্ডার</h3>
        <Link href="/admin/orders" className="text-sm text-red-600 hover:text-red-700 font-medium">
          সব দেখুন
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-slate-100 rounded animate-pulse" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center py-8 text-slate-400 text-sm">এখনো কোনো অর্ডার নেই।</p>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 uppercase border-b">
                  <th className="pb-3 pr-4">Order ID</th>
                  <th className="pb-3 pr-4">গ্রাহক</th>
                  <th className="pb-3 pr-4">মোট</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="py-3 pr-4 font-medium text-slate-700">{order.order_code}</td>
                    <td className="py-3 pr-4 text-slate-600">{order.customer_name}</td>
                    <td className="py-3 pr-4 font-semibold text-green-600">৳{order.total}</td>
                    <td className="py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyle[order.status]}`}>
                        {statusLabel[order.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="border border-slate-100 rounded-lg p-3">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-slate-800 truncate">{order.order_code}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{order.customer_name}</p>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-1 rounded-full whitespace-nowrap ${statusStyle[order.status]}`}>
                    {statusLabel[order.status]}
                  </span>
                </div>
                <div className="flex justify-end">
                  <span className="font-bold text-green-600 text-sm">৳{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}