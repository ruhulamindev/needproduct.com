"use client"

import { useState } from "react"
import Link from "next/link"
import { api } from "@/lib/api"
import { Mail, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await api("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      })
      setSent(true)
    } catch (err: any) {
      setError(err.message || "সমস্যা হয়েছে। আবার চেষ্টা করুন।")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 w-full max-w-md p-8">
        {sent ? (
          // ===== পাঠানো হয়েছে =====
          <div className="text-center">
            <div className="text-5xl mb-4">📧</div>
            <h1 className="text-xl font-bold text-slate-800 mb-2">ইমেইল দেখুন</h1>
            <p className="text-slate-600 text-sm mb-6">
              যদি <strong>{email}</strong> ঠিকানায় অ্যাকাউন্ট থাকে, তাহলে পাসওয়ার্ড রিসেট
              করার লিংক পাঠানো হয়েছে। লিংকটি ১ ঘণ্টা কার্যকর থাকবে।
            </p>
            <p className="text-xs text-slate-400 mb-6">
              ইমেইল না পেলে spam folder দেখুন।
            </p>
            <Link href="/login" className="text-red-600 hover:underline text-sm font-medium">
              ← Login-এ ফিরে যান
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-800">পাসওয়ার্ড ভুলে গেছেন?</h1>
              <p className="text-sm text-slate-500 mt-1">
                আপনার ইমেইল দিন — রিসেট লিংক পাঠাব।
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
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
                {loading ? "পাঠানো হচ্ছে..." : "রিসেট লিংক পাঠান"}
              </button>
            </form>

            <Link
              href="/login"
              className="mt-6 flex items-center justify-center gap-1 text-sm text-slate-600 hover:text-red-600"
            >
              <ArrowLeft className="w-4 h-4" />
              Login-এ ফিরে যান
            </Link>
          </>
        )}
      </div>
    </div>
  )
}