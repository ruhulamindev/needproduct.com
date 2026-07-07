"use client"

import { X, User, Phone, MapPin, Package } from "lucide-react"
import type { AdminOrder } from "./orders-table"

type Props = {
  order: AdminOrder
  onClose: () => void
  statusLabel: Record<string, string>
}

export default function OrderDetailsModal({ order, onClose, statusLabel }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white">
          <div>
            <h3 className="text-lg font-bold text-slate-800">{order.id}</h3>
            <p className="text-xs text-slate-500">{order.date}</p>
          </div>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Customer */}
          <div>
            <h4 className="font-semibold text-slate-700 mb-2 text-sm">গ্রাহকের তথ্য</h4>
            <div className="space-y-1.5 text-sm text-slate-600">
              <p className="flex items-center gap-2"><User className="w-4 h-4 text-slate-400" /> {order.customer.name}</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-400" /> {order.customer.phone}</p>
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> {order.customer.address}</p>
            </div>
          </div>

          {/* Items */}
          <div>
            <h4 className="font-semibold text-slate-700 mb-2 text-sm flex items-center gap-1">
              <Package className="w-4 h-4" /> পণ্যসমূহ
            </h4>
            <div className="border rounded-lg divide-y">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between p-3 text-sm">
                  <span className="text-slate-700">{item.name} × {item.quantity}</span>
                  <span className="font-medium">৳{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Payment</span>
              <span className="font-medium">
                {order.paymentMethod === "cod" ? "ক্যাশ অন ডেলিভারি" : order.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Status</span>
              <span className="font-medium">{statusLabel[order.status]}</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-bold text-base">
              <span>মোট</span>
              <span className="text-green-600">৳{order.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}