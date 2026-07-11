"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Eye, Search, Phone } from "lucide-react"
import { api } from "@/lib/api"
import OrderDetailsModal from "./order-details-modal"

export type AdminOrder = {
  id: string
  order_code: string
  customer_name: string
  customer_phone: string
  customer_address: string
  created_at: string
  items: { id: string; product_name: string; quantity: number; price: number; image?: string }[]
  subtotal: number
  discount: number
  delivery_charge: number
  total: number
  coupon_code?: string
  payment_method: string
  status: string
}

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
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  // ===== API থেকে সব order =====
  const loadOrders = async () => {
    try {
      setLoading(true)
      const res = await api<{ data: AdminOrder[] }>("/orders")
      setOrders(res.data)
    } catch (err) {
      console.error("Failed to load orders:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  // ===== status বদলানো (API-তে) =====
  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id)
    // আগের value মনে রাখি (fail করলে ফিরিয়ে আনতে)
    const prev = orders

    // সাথে সাথে UI-তে দেখাই (optimistic)
    setOrders((list) =>
      list.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    )

    try {
      await api(`/orders/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      })
    } catch (err: any) {
      // fail করলে আগের অবস্থায় ফেরাও
      setOrders(prev)
      alert(err.message || "Status বদলাতে সমস্যা হয়েছে")
    } finally {
      setUpdatingId(null)
    }
  }

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.order_code.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_phone.includes(search)
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
            placeholder="Order code, নাম বা ফোন..."
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

      {/* Loading */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* ===== Desktop Table ===== */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-100">
            <table className="min-w-full text-sm text-left text-slate-700">
              <thead className="bg-slate-50 border-b text-xs text-slate-500 uppercase">
                <tr>
                  <th className="px-4 py-3">Order Code</th>
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
                      <td className="px-4 py-3 font-medium">{order.order_code}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-800">{order.customer_name}</p>
                        <p className="text-xs text-slate-400">{order.customer_phone}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {new Date(order.created_at).toLocaleDateString("bn-BD")}
                      </td>
                      <td className="px-4 py-3 font-semibold text-green-600">৳{order.total}</td>
                      <td className="px-4 py-3">
                        <select
                          value={order.status}
                          disabled={updatingId === order.id}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`text-xs font-medium px-2 py-1 rounded-full border cursor-pointer focus:outline-none disabled:opacity-50 ${statusStyle[order.status]}`}
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
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-slate-800 truncate">{order.order_code}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {new Date(order.created_at).toLocaleDateString("bn-BD")}
                      </p>
                    </div>
                    <span className="font-bold text-green-600 text-base shrink-0">৳{order.total}</span>
                  </div>

                  <div className="mt-2.5 pt-2.5 border-t border-slate-100">
                    <p className="text-sm font-medium text-slate-800">{order.customer_name}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3" />
                      {order.customer_phone}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <select
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`flex-1 text-xs font-medium px-2 py-2 rounded-lg border cursor-pointer focus:outline-none disabled:opacity-50 ${statusStyle[order.status]}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{statusLabel[s]}</option>
                      ))}
                    </select>
                    <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order)} className="shrink-0">
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
        </>
      )}

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