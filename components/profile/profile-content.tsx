"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { updateProfile } from "@/lib/profile-api"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  ClipboardList,
  Heart,
  Pencil,
  Save,
  X,
  LogOut,
} from "lucide-react"

export default function ProfileContent() {
  const { user, loading, refreshUser, logout } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    delivery_zone: "",
  })

  // user এলে form ভরি
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        delivery_zone: user.delivery_zone || "",
      })
    }
  }, [user])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateProfile({
        name: form.name,
        phone: form.phone || undefined,
        address: form.address || undefined,
        delivery_zone: form.delivery_zone || undefined,
      })
      await refreshUser()
      setEditing(false)
      toast({ title: "প্রোফাইল আপডেট হয়েছে ✅" })
    } catch (err: any) {
      toast({ title: "সমস্যা হয়েছে", description: err.message, variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setEditing(false)
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        delivery_zone: user.delivery_zone || "",
      })
    }
  }

  // ===== একবার click-এ logout (plm5) =====
  const handleLogout = async () => {
    setLoggingOut(true)
    await logout()
    router.push("/login")
  }

  // ===== Loading =====
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-32 bg-slate-200 rounded-xl animate-pulse" />
        <div className="h-48 bg-slate-200 rounded-xl animate-pulse" />
      </div>
    )
  }

  // ===== Not logged in =====
  if (!user) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">👤</div>
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">আপনি লগইন করেননি</h2>
        <p className="text-slate-600 mb-6">প্রোফাইল দেখতে হলে প্রথমে লগইন করুন।</p>
        <div className="flex gap-3 justify-center">
          <Link href="/login"><Button className="bg-red-600 hover:bg-red-700">Login</Button></Link>
          <Link href="/register"><Button variant="outline">Register</Button></Link>
        </div>
      </div>
    )
  }

  const zoneLabel =
    user.delivery_zone === "dhaka" ? "ঢাকার ভেতরে"
    : user.delivery_zone === "outside" ? "ঢাকার বাইরে"
    : "—"

  const inputClass =
    "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800">My Profile</h1>

      {/* Account Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl font-bold shrink-0">
          {(user.name || "U").charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-800 truncate">{user.name}</h2>
          <p className="text-slate-500 text-sm truncate">{user.email}</p>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-slate-800">যোগাযোগ ও ডেলিভারি তথ্য</h3>
          {!editing ? (
            <button onClick={() => setEditing(true)} className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium">
              <Pencil className="w-4 h-4" /> Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium disabled:opacity-50">
                <Save className="w-4 h-4" /> {saving ? "..." : "Save"}
              </button>
              <button onClick={handleCancel} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 font-medium">
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          )}
        </div>

        {!editing ? (
          <div className="space-y-4">
            <Row icon={User} label="নাম" value={user.name} />
            <Row icon={Mail} label="ইমেইল" value={user.email} />
            <Row icon={Phone} label="ফোন" value={user.phone || ""} />
            <Row icon={MapPin} label="ঠিকানা" value={user.address || ""} />
            <Row icon={Package} label="ডেলিভারি এলাকা" value={zoneLabel} />
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">নাম</label>
              <input name="name" value={form.name} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">ফোন</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+880..." className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">ঠিকানা</label>
              <textarea name="address" value={form.address} onChange={handleChange} rows={3} placeholder="সম্পূর্ণ ঠিকানা" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">ডেলিভারি এলাকা</label>
              <select name="delivery_zone" value={form.delivery_zone} onChange={handleChange} className={inputClass}>
                <option value="">এলাকা নির্বাচন করুন</option>
                <option value="dhaka">ঢাকার ভেতরে</option>
                <option value="outside">ঢাকার বাইরে</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/orders" className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition">
          <Package className="w-6 h-6 text-red-600" />
          <span className="font-medium text-slate-800">আমার অর্ডার</span>
        </Link>
        <Link href="/my-requests" className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition">
          <ClipboardList className="w-6 h-6 text-red-600" />
          <span className="font-medium text-slate-800">আমার রিকোয়েস্ট</span>
        </Link>
        <Link href="/wishlist" className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition">
          <Heart className="w-6 h-6 text-red-600" />
          <span className="font-medium text-slate-800">Wishlist</span>
        </Link>
      </div>

      {/* Logout — একবার click-এ (plm5) */}
      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className="w-full flex items-center justify-center gap-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl p-4 font-medium transition disabled:opacity-50"
      >
        <LogOut className="w-5 h-5" />
        {loggingOut ? "লগআউট হচ্ছে..." : "Logout"}
      </button>
    </div>
  )
}

function Row({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-slate-800 break-words">{value || "—"}</p>
      </div>
    </div>
  )
}