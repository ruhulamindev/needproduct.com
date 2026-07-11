"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { fetchMyRequests } from "@/lib/requests-api"
import { Button } from "@/components/ui/button"
import { Package, Clock, Search, CheckCircle2, XCircle, RefreshCw } from "lucide-react"

const STATUS: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "অপেক্ষমাণ", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  reviewing: { label: "যাচাই হচ্ছে", color: "bg-blue-100 text-blue-700", icon: Search },
  available: { label: "পাওয়া যাচ্ছে", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  unavailable: { label: "পাওয়া যাচ্ছে না", color: "bg-red-100 text-red-700", icon: XCircle },
}

export default function MyRequestsPage() {
  const { user, loading: authLoading } = useAuth()
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const load = useCallback(async () => {
    try {
      const data = await fetchMyRequests()
      setRequests(data)
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      setLoading(false)
      return
    }
    load().finally(() => setLoading(false))
  }, [user, authLoading, load])

  const handleRefresh = async () => {
    setRefreshing(true)
    await load()
    setRefreshing(false)
  }

  if (!authLoading && !user) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16 text-center min-h-screen">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          রিকোয়েস্ট দেখতে login করুন
        </h2>
        <Link href="/login">
          <Button className="bg-red-600 hover:bg-red-700">Login করুন</Button>
        </Link>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">আমার রিকোয়েস্ট</h1>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border rounded-xl p-5 h-24 bg-slate-100 animate-pulse" />
          ))}
        </div>
      </main>
    )
  }

  if (requests.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">আমার রিকোয়েস্ট</h1>
          <button onClick={handleRefresh} className="text-sm text-red-600 flex items-center gap-1">
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            রিফ্রেশ
          </button>
        </div>
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            আপনি কোনো রিকোয়েস্ট করেননি
          </h2>
          <p className="text-slate-600 mb-6">
            খুঁজে না পাওয়া পণ্যের জন্য request করুন।
          </p>
          <Link href="/request">
            <Button className="bg-red-600 hover:bg-red-700">রিকোয়েস্ট করুন</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          আমার রিকোয়েস্ট{" "}
          <span className="text-lg font-medium text-slate-500">({requests.length})</span>
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="text-sm text-red-600 flex items-center gap-1 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            রিফ্রেশ
          </button>
          <Link href="/request">
            <Button variant="outline" size="sm">নতুন</Button>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {requests.map((req) => {
          const status = STATUS[req.status] ?? STATUS.pending
          const StatusIcon = status.icon

          return (
            <div key={req.id} className="border border-slate-200 rounded-xl p-4 md:p-5 bg-white">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="font-semibold text-slate-800">{req.product_name}</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {new Date(req.created_at).toLocaleDateString("bn-BD", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </p>
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
                  <StatusIcon className="w-3.5 h-3.5" />
                  {status.label}
                </span>
              </div>

              {req.description && (
                <p className="text-sm text-slate-600 mt-3 bg-slate-50 rounded-lg p-3">
                  {req.description}
                </p>
              )}

              <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                {req.budget && <span>বাজেট: <strong className="text-slate-700">৳{req.budget}</strong></span>}
                {req.phone && <span>ফোন: {req.phone}</span>}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}