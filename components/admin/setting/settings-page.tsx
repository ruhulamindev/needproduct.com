"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Settings {
  siteName: string
  contactEmail: string
  phoneNumber: string
  whatsappNumber: string
  address: string
  facebookUrl: string
  instagramUrl: string
  deliveryDhaka: number
  deliveryOutside: number
}

const defaultSettings: Settings = {
  siteName: "NeedProduct",
  contactEmail: "info@needproduct.com",
  phoneNumber: "+880131200000",
  whatsappNumber: "8801312000000",
  address: "রাজশাহী, বাংলাদেশ",
  facebookUrl: "https://facebook.com/needproduct",
  instagramUrl: "https://instagram.com/needproduct",
  deliveryDhaka: 60,
  deliveryOutside: 120,
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccess(false)
    // পরে backend যুক্ত হলে এখানে API call বসবে
    await new Promise((r) => setTimeout(r, 800))
    setSaving(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const inputClass =
    "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Settings</h1>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          ✅ Settings সফলভাবে সংরক্ষিত হয়েছে।
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-6 max-w-3xl">
        {/* সাধারণ তথ্য */}
        <div>
          <h3 className="font-semibold text-slate-800 mb-4">সাধারণ তথ্য</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Site Name</label>
              <input name="siteName" value={settings.siteName} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact Email</label>
              <input name="contactEmail" type="email" value={settings.contactEmail} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">ফোন নম্বর</label>
              <input name="phoneNumber" value={settings.phoneNumber} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp নম্বর</label>
              <input name="whatsappNumber" value={settings.whatsappNumber} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">ঠিকানা</label>
            <textarea name="address" value={settings.address} onChange={handleChange} rows={2} className={inputClass} />
          </div>
        </div>

        {/* Delivery Charge */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-slate-800 mb-4">ডেলিভারি চার্জ (৳)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">ঢাকার ভেতরে</label>
              <input name="deliveryDhaka" type="number" value={settings.deliveryDhaka} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">ঢাকার বাইরে</label>
              <input name="deliveryOutside" type="number" value={settings.deliveryOutside} onChange={handleChange} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-slate-800 mb-4">সোশ্যাল মিডিয়া</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Facebook URL</label>
              <input name="facebookUrl" type="url" value={settings.facebookUrl} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Instagram URL</label>
              <input name="instagramUrl" type="url" value={settings.instagramUrl} onChange={handleChange} className={inputClass} />
            </div>
          </div>
        </div>

        <Button type="submit" disabled={saving} className="bg-red-600 hover:bg-red-700">
          {saving ? "সংরক্ষণ হচ্ছে..." : "Settings সংরক্ষণ করুন"}
        </Button>
      </form>
    </div>
  )
}