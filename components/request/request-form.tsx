"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Send, MessageCircle } from "lucide-react"

export default function RequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    productName: "",
    category: "",
    quantity: "1",
    budget: "",
    details: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // 🔴 তোমার WhatsApp নম্বর
  const whatsapp = "8801789011141"

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // পরে backend যুক্ত হলে এখানে আসল API call বসবে
    setTimeout(() => {
      toast({
        title: "অনুরোধ পাঠানো হয়েছে! ✅",
        description: "আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
      })
      setFormData({
        name: "",
        phone: "",
        email: "",
        productName: "",
        category: "",
        quantity: "1",
        budget: "",
        details: "",
      })
      setLoading(false)
    }, 1000)
  }

  const handleWhatsApp = () => {
    const text =
      `*নতুন পণ্যের অনুরোধ*%0A` +
      `নাম: ${formData.name || "-"}%0A` +
      `ফোন: ${formData.phone || "-"}%0A` +
      `পণ্য: ${formData.productName || "-"}%0A` +
      `Category: ${formData.category || "-"}%0A` +
      `পরিমাণ: ${formData.quantity || "-"}%0A` +
      `বাজেট: ${formData.budget || "-"}%0A` +
      `বিস্তারিত: ${formData.details || "-"}`
    window.open(`https://wa.me/${whatsapp}?text=${text}`, "_blank")
  }

  const inputClass =
    "w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 md:p-8 bg-white rounded-xl shadow-sm border border-slate-100 space-y-5"
    >
      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">নাম *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="আপনার নাম" className={inputClass} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">ফোন *</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+880 1XXX-XXXXXX" className={inputClass} required />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">ইমেইল (ঐচ্ছিক)</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={inputClass} />
      </div>

      {/* Product Info */}
      <div className="border-t border-slate-100 pt-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">কোন পণ্য চান? *</label>
          <input type="text" name="productName" value={formData.productName} onChange={handleChange} placeholder="যেমন: Samsung Galaxy A54" className={inputClass} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="যেমন: Mobile" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">পরিমাণ</label>
            <input type="number" name="quantity" min="1" value={formData.quantity} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">বাজেট (৳)</label>
            <input type="text" name="budget" value={formData.budget} onChange={handleChange} placeholder="যেমন: 30000" className={inputClass} />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">বিস্তারিত</label>
        <textarea name="details" value={formData.details} onChange={handleChange} rows={4} placeholder="রঙ, ব্র্যান্ড, মডেল বা অন্য কোনো প্রয়োজন লিখুন..." className={inputClass} />
      </div>

      {/* Buttons */}
      <div className="space-y-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-medium transition disabled:opacity-60"
        >
          <Send className="w-4 h-4" />
          {loading ? "পাঠানো হচ্ছে..." : "অনুরোধ পাঠান"}
        </button>

        <button
          type="button"
          onClick={handleWhatsApp}
          className="w-full flex items-center justify-center gap-2 border border-green-600 text-green-700 hover:bg-green-50 py-2.5 rounded-lg font-medium transition"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp-এ অনুরোধ পাঠান
        </button>
      </div>
    </form>
  )
}