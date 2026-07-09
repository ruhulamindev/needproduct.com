"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (form.password.length < 6) {
      setError("Password কমপক্ষে ৬ অক্ষরের হতে হবে।")
      return
    }

    setLoading(true)
    setError("")

    const success = await register(form.name, form.email, form.password, form.phone)
    setLoading(false)

    if (success) {
      // ফোন নম্বরটা profile-এ save করে রাখছি (checkout-এ কাজে লাগবে)
      try {
        const saved = localStorage.getItem("profile")
        const profile = saved ? JSON.parse(saved) : {}
        localStorage.setItem(
          "profile",
          JSON.stringify({ ...profile, name: form.name, email: form.email, phone: form.phone })
        )
      } catch {}

      router.push("/profile") // ✅ profile page-এ পাঠাচ্ছি
    } else {
      setError("Registration ব্যর্থ। এই email হয়তো আগেই ব্যবহৃত হয়েছে।")
    }
  }

  const inputClass =
    "w-full border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Register</h1>
          <p className="text-sm text-slate-500 mt-1">নতুন অ্যাকাউন্ট তৈরি করুন</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">পুরো নাম</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input name="name" value={form.name} onChange={handleChange} placeholder="আপনার নাম" required className={inputClass} />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required className={inputClass} />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">ফোন নম্বর</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+880 1XXX-XXXXXX" required className={inputClass} />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                name="password"
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-60"
          >
            {loading ? "Register হচ্ছে..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/login" className="text-red-600 font-semibold hover:underline">
            Login করুন
          </Link>
        </p>
      </div>
    </div>
  )
}