"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { api } from "@/lib/api"
import { Lock, Eye, EyeOff } from "lucide-react"

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token") || ""

  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।")
      return
    }
    if (password !== confirm) {
      setError("দুইটা পাসওয়ার্ড মিলছে না।")
      return
    }

    setLoading(true)
    setError("")

    try {
      await api("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      })
      setDone(true)
      setTimeout(() => router.push("/login"), 2500)
    } catch (err: any) {
      setError(err.message || "সমস্যা হয়েছে।")
    } finally {
      setLoading(false)
    }
  }

  // token নেই
  if (!token) {
    return (
      <div className="text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h1 className="text-xl font-bold text-slate-800 mb-2">অকার্যকর লিংক</h1>
        <p className="text-slate-600 text-sm mb-6">
          এই লিংকটি সঠিক নয়। আবার রিসেট করার চেষ্টা করুন।
        </p>
        <Link href="/forgot-password" className="text-red-600 hover:underline font-medium">
          আবার চেষ্টা করুন
        </Link>
      </div>
    )
  }

  // সফল
  if (done) {
    return (
      <div className="text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-xl font-bold text-slate-800 mb-2">পাসওয়ার্ড বদলে গেছে!</h1>
        <p className="text-slate-600 text-sm">Login page-এ নিয়ে যাচ্ছি...</p>
      </div>
    )
  }

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">নতুন পাসওয়ার্ড দিন</h1>
        <p className="text-sm text-slate-500 mt-1">নতুন পাসওয়ার্ড দুইবার লিখুন।</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">নতুন পাসওয়ার্ড</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৬ অক্ষর"
              required
              className="w-full border border-slate-300 rounded-lg pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">আবার লিখুন</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type={showPass ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="একই পাসওয়ার্ড"
              required
              className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-60"
        >
          {loading ? "বদলানো হচ্ছে..." : "পাসওয়ার্ড বদলান"}
        </button>
      </form>
    </>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 w-full max-w-md p-8">
        <Suspense fallback={<div className="h-48 bg-slate-100 rounded animate-pulse" />}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  )
}