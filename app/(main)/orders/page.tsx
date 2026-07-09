"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { fetchMyOrders } from "@/lib/orders-api"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Package, ChevronDown, ChevronUp, Clock, CheckCircle2, Truck, XCircle, Loader2 } from "lucide-react"

const STATUS: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "অপেক্ষমাণ", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  processing: { label: "প্রক্রিয়াধীন", color: "bg-blue-100 text-blue-700", icon: Loader2 },
  shipped: { label: "পাঠানো হয়েছে", color: "bg-purple-100 text-purple-700", icon: Truck },
  delivered: { label: "সম্পন্ন", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  cancelled: { label: "বাতিল", color: "bg-red-100 text-red-700", icon: XCircle },
}

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      setLoading(false)
      return
    }
    fetchMyOrders()
      .then(setOrders)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }, [user, authLoading])

  // login করা নেই
  if (!authLoading && !user) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center min-h-screen">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-xl font-semibold text-slate-800 mb-2">অর্ডার দেখতে login করুন</h2>
        <p className="text-slate-600 mb-6">আপনার অর্ডারের ইতিহাস দেখতে হলে প্রথমে login করতে হবে।</p>
        <Link href="/login"><Button className="bg-red-600 hover:bg-red-700">Login করুন</Button></Link>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">My Orders</h1>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border rounded-xl p-5 space-y-3">
              <div className="h-5 w-1/3 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-1/4 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </main>
    )
  }

  if (orders.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">My Orders</h1>
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">এখনো কোনো অর্ডার নেই</h2>
          <p className="text-slate-600 mb-6">কেনাকাটা শুরু করুন — আপনার অর্ডার এখানে দেখা যাবে।</p>
          <Link href="/shop"><Button className="bg-red-600 hover:bg-red-700">কেনাকাটা শুরু করুন</Button></Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
        My Orders <span className="text-lg font-medium text-slate-500">({orders.length})</span>
      </h1>

      <div className="space-y-4">
        {orders.map((order) => {
          const isOpen = openId === order.id
          const status = STATUS[order.status] ?? STATUS.pending
          const StatusIcon = status.icon
          const itemCount = order.items.reduce((s: number, i: any) => s + i.quantity, 0)

          return (
            <div key={order.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <div className="p-4 md:p-5">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Package className="w-4 h-4 text-slate-500" />
                      <span className="font-semibold text-slate-800">{order.order_code}</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {new Date(order.created_at).toLocaleDateString("bn-BD", { year: "numeric", month: "long", day: "numeric" })} • {itemCount}টি পণ্য
                    </p>
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
                    <StatusIcon className="w-3.5 h-3.5" />{status.label}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-green-600">৳{order.total}</span>
                  <button onClick={() => setOpenId(isOpen ? null : order.id)}
                    className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium">
                    {isOpen ? "কম দেখুন" : "বিস্তারিত"}
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isOpen && (
                <div className="border-t border-slate-100 p-4 md:p-5 bg-slate-50 space-y-4">
                  <div className="space-y-3">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img src={item.image} alt={item.product_name} className="w-12 h-12 object-cover rounded border" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 line-clamp-1">{item.product_name}</p>
                          <p className="text-xs text-slate-500">{item.quantity} × ৳{item.price}</p>
                        </div>
                        <span className="text-sm font-medium">৳{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-200 pt-3 space-y-1 text-sm">
                    <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>৳{order.subtotal}</span></div>
                    {Number(order.discount) > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount {order.coupon_code ? `(${order.coupon_code})` : ""}</span><span>-৳{order.discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600"><span>Delivery</span><span>৳{order.delivery_charge}</span></div>
                    <div className="flex justify-between font-bold text-slate-800 pt-1 border-t border-slate-200 mt-1">
                      <span>মোট</span><span className="text-green-600">৳{order.total}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-3 text-sm">
                    <p className="font-medium text-slate-700 mb-1">ডেলিভারি তথ্য</p>
                    <p className="text-slate-600">{order.customer_name}</p>
                    <p className="text-slate-600">{order.customer_phone}</p>
                    <p className="text-slate-600">{order.customer_address}</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </main>
  )
}