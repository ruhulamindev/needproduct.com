"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Heart,
  LogOut,
  Pencil,
  Save,
  X,
} from "lucide-react"

type ProfileData = {
  name: string
  email: string
  phone: string
  address: string
  deliveryZone: string // dhaka / outside
}

const EMPTY: ProfileData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  deliveryZone: "",
}

export default function ProfileContent() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [profile, setProfile] = useState<ProfileData>(EMPTY)
  const [form, setForm] = useState<ProfileData>(EMPTY)
  const [editing, setEditing] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // localStorage থেকে profile পড়া (একবার)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("profile")
      if (saved) {
        const data = JSON.parse(saved)
        setProfile(data)
        setForm(data)
      } else if (user) {
        // auth থেকে যা পাওয়া যায় দিয়ে শুরু
        const initial = {
          ...EMPTY,
          name: user?.name || "",
          email: user?.email || "",
        }
        setProfile(initial)
        setForm(initial)
      }
    } catch (err) {
      console.error("Profile load failed:", err)
    } finally {
      setIsLoaded(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setProfile(form)
    localStorage.setItem("profile", JSON.stringify(form))
    setEditing(false)
    toast({
      title: "প্রোফাইল সংরক্ষিত হয়েছে ✅",
      description: "আপনার তথ্য আপডেট করা হয়েছে।",
    })
  }

  const handleCancel = () => {
    setForm(profile)
    setEditing(false)
  }

  // ===== Loading =====
  if (!isLoaded) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-40 bg-slate-200 rounded animate-pulse" />
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
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">
          আপনি লগইন করেননি
        </h2>
        <p className="text-slate-600 mb-6">
          প্রোফাইল দেখতে হলে প্রথমে লগইন করুন।
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/login">
            <Button className="bg-red-600 hover:bg-red-700">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">Register</Button>
          </Link>
        </div>
      </div>
    )
  }

  const zoneLabel =
    profile.deliveryZone === "dhaka"
      ? "ঢাকার ভেতরে"
      : profile.deliveryZone === "outside"
      ? "ঢাকার বাইরে"
      : "—"

  const inputClass =
    "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
        My Profile
      </h1>

      {/* ===== Account Card ===== */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl font-bold shrink-0">
          {(profile.name || user?.name || "U").charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-800 truncate">
            {profile.name || user?.name || "গ্রাহক"}
          </h2>
          <p className="text-slate-500 text-sm truncate">
            {profile.email || user?.email || "ইমেইল যোগ করুন"}
          </p>
        </div>
      </div>

      {/* ===== Details Card ===== */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-slate-800">
            যোগাযোগ ও ডেলিভারি তথ্য
          </h3>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 font-medium"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* View mode */}
        {!editing ? (
          <div className="space-y-4">
            <Row icon={User} label="নাম" value={profile.name} />
            <Row icon={Mail} label="ইমেইল" value={profile.email} />
            <Row icon={Phone} label="ফোন" value={profile.phone} />
            <Row icon={MapPin} label="ঠিকানা" value={profile.address} />
            <Row icon={Package} label="ডেলিভারি এলাকা" value={zoneLabel} />
          </div>
        ) : (
          // Edit mode
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">নাম</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="আপনার নাম" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">ইমেইল</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">ফোন</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+880 1XXX-XXXXXX" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">ঠিকানা</label>
              <textarea name="address" value={form.address} onChange={handleChange} rows={3} placeholder="সম্পূর্ণ ঠিকানা" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">ডেলিভারি এলাকা</label>
              <select name="deliveryZone" value={form.deliveryZone} onChange={handleChange} className={inputClass}>
                <option value="">এলাকা নির্বাচন করুন</option>
                <option value="dhaka">ঢাকার ভেতরে</option>
                <option value="outside">ঢাকার বাইরে</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* ===== Quick Links ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/orders"
          className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition"
        >
          <Package className="w-6 h-6 text-red-600" />
          <span className="font-medium text-slate-800">আমার অর্ডার</span>
        </Link>
        <Link
          href="/wishlist"
          className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition"
        >
          <Heart className="w-6 h-6 text-red-600" />
          <span className="font-medium text-slate-800">Wishlist</span>
        </Link>
        <Link
          href="/logout"
          className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition text-red-600"
        >
          <LogOut className="w-6 h-6" />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </div>
  )
}

// একটা row দেখানোর ছোট helper
function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: any
  label: string
  value: string
}) {
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