"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, Search, Phone } from "lucide-react"
import OrderDetailsModal from "./order-details-modal"

export type AdminOrder = {
  id: string
  customer: { name: string; phone: string; address: string }
  date: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  paymentMethod: string
  status: string
}

const DEMO_ORDERS: AdminOrder[] = [
  {
    id: "NP-2401-4821",
    customer: { name: "করিম উদ্দিন", phone: "+8801712345678", address: "রাজশাহী সদর, রাজশাহী" },
    date: "2026-01-05",
    items: [{ name: "Apple iPhone 14", quantity: 1, price: 809 }],
    total: 869,
    paymentMethod: "cod",
    status: "pending",
  },
  {
    id: "NP-2401-4822",
    customer: { name: "রহিম মিয়া", phone: "+8801812345678", address: "মিরপুর, ঢাকা" },
    date: "2026-01-05",
    items: [{ name: "Sports Shoes", quantity: 2, price: 96 }],
    total: 252,
    paymentMethod: "cod",
    status: "processing",
  },
  {
    id: "NP-2401-4823",
    customer: { name: "সালমা বেগম", phone: "+8801912345678", address: "চট্টগ্রাম" },
    date: "2026-01-04",
    items: [{ name: "Dell XPS 13", quantity: 1, price: 1399 }],
    total: 1519,
    paymentMethod: "cod",
    status: "shipped",
  },
]

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"]

const statusStyle: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  processing: "bg-blue-100 text-blue-700 border-blue-200",
  shipped: "bg-purple-100 text-purple-700 border-purple-200",
  delivered: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
}

const statusLabel: Record<string, string> = {
  pending: "অপেক্ষমাণ",
  processing: "প্রক্রিয়াধীন",
  shipped: "পাঠানো হয়েছে",
  delivered: "সম্পন্ন",
  cancelled: "বাতিল",
}

export default function OrdersTable() {
  const [orders, setOrders] = useState<AdminOrder[]>(DEMO_ORDERS)
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    )
  }

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.phone.includes(search)
    const matchStatus = filterStatus === "all" || o.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-5">
      {/* Header */}
      <h1 className="text-xl md:text-3xl font-bold text-slate-800">
        Orders{" "}
        <span className="text-base md:text-lg font-medium text-slate-400">
          ({orders.length})
        </span>
      </h1>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Order ID, নাম বা ফোন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full sm:w-auto border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="all">সব status</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{statusLabel[s]}</option>
          ))}
        </select>
      </div>

      {/* ===== Desktop Table ===== */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-100">
        <table className="min-w-full text-sm text-left text-slate-700">
          <thead className="bg-slate-50 border-b text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">গ্রাহক</th>
              <th className="px-4 py-3">তারিখ</th>
              <th className="px-4 py-3">মোট</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">দেখুন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length > 0 ? (
              filtered.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{order.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-800">{order.customer.name}</p>
                    <p className="text-xs text-slate-400">{order.customer.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{order.date}</td>
                  <td className="px-4 py-3 font-semibold text-green-600">৳{order.total}</td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`text-xs font-medium px-2 py-1 rounded-full border cursor-pointer focus:outline-none ${statusStyle[order.status]}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{statusLabel[s]}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-10 text-slate-400">
                  কোনো অর্ডার পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile Cards ===== */}
      <div className="md:hidden space-y-3">
        {filtered.length > 0 ? (
          filtered.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
              {/* Top: ID + Total */}
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-slate-800 truncate">{order.id}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{order.date}</p>
                </div>
                <span className="font-bold text-green-600 text-base shrink-0">
                  ৳{order.total}
                </span>
              </div>

              {/* Customer */}
              <div className="mt-2.5 pt-2.5 border-t border-slate-100">
                <p className="text-sm font-medium text-slate-800">{order.customer.name}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3" />
                  {order.customer.phone}
                </p>
              </div>

              {/* Status + View */}
              <div className="flex items-center gap-2 mt-3">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className={`flex-1 text-xs font-medium px-2 py-2 rounded-lg border cursor-pointer focus:outline-none ${statusStyle[order.status]}`}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{statusLabel[s]}</option>
                  ))}
                </select>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedOrder(order)}
                  className="shrink-0"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  দেখুন
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-10 text-slate-400">কোনো অর্ডার পাওয়া যায়নি।</p>
        )}
      </div>

      {/* Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          statusLabel={statusLabel}
        />
      )}
    </div>
  )
}