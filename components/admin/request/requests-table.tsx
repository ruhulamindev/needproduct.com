"use client"

import { useState, useEffect } from "react"
import { Search, Phone, Package } from "lucide-react"
import { fetchAllRequests, updateRequestStatus } from "@/lib/requests-api"

const STATUSES = ["pending", "reviewing", "available", "unavailable"]

const statusStyle: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  reviewing: "bg-blue-100 text-blue-700 border-blue-200",
  available: "bg-green-100 text-green-700 border-green-200",
  unavailable: "bg-red-100 text-red-700 border-red-200",
}

const statusLabel: Record<string, string> = {
  pending: "অপেক্ষমাণ",
  reviewing: "যাচাই হচ্ছে",
  available: "পাওয়া যাচ্ছে",
  unavailable: "পাওয়া যাচ্ছে না",
}

export default function RequestsTable() {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const loadRequests = async () => {
    try {
      setLoading(true)
      const data = await fetchAllRequests()
      setRequests(data)
    } catch (err) {
      console.error("Failed to load requests:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRequests()
  }, [])

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id)
    const prev = requests
    setRequests((list) =>
      list.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    )
    try {
      await updateRequestStatus(id, newStatus)
    } catch (err: any) {
      setRequests(prev)
      alert(err.message || "Status বদলাতে সমস্যা হয়েছে")
    } finally {
      setUpdatingId(null)
    }
  }

  const filtered = requests.filter((r) => {
    const matchSearch =
      r.product_name.toLowerCase().includes(search.toLowerCase()) ||
      (r.phone || "").includes(search)
    const matchStatus = filterStatus === "all" || r.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-5">
      {/* Header */}
      <h1 className="text-xl md:text-3xl font-bold text-slate-800">
        Requests{" "}
        <span className="text-base md:text-lg font-medium text-slate-400">
          ({requests.length})
        </span>
      </h1>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="পণ্যের নাম বা ফোন..."
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
            <div key={i} className="h-24 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center py-16 text-slate-400">কোনো রিকোয়েস্ট নেই।</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => (
            <div key={req.id} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="font-semibold text-slate-800">{req.product_name}</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {new Date(req.created_at).toLocaleDateString("bn-BD", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </p>

                  {req.description && (
                    <p className="text-sm text-slate-600 mt-2 bg-slate-50 rounded-lg p-2.5">
                      {req.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 flex-wrap">
                    {req.budget && (
                      <span>বাজেট: <strong className="text-slate-700">৳{req.budget}</strong></span>
                    )}
                    {req.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {req.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status dropdown */}
                <select
                  value={req.status}
                  disabled={updatingId === req.id}
                  onChange={(e) => handleStatusChange(req.id, e.target.value)}
                  className={`text-xs font-medium px-2.5 py-1.5 rounded-full border cursor-pointer focus:outline-none disabled:opacity-50 shrink-0 ${statusStyle[req.status]}`}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{statusLabel[s]}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}