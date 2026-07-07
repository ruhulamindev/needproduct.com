"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { MessageCircle } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // 🔴 তোমার WhatsApp নম্বর
  const whatsapp = "8801789011141"

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // পরে backend যুক্ত হলে এখানে আসল API call বসবে
    setTimeout(() => {
      toast({
        title: "বার্তা পাঠানো হয়েছে!",
        description: "যোগাযোগের জন্য ধন্যবাদ। আমরা শীঘ্রই উত্তর দেব।",
      })
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      setLoading(false)
    }, 1000)
  }

  // WhatsApp-এ সরাসরি বার্তা পাঠানো
  const handleWhatsApp = () => {
    const text = `নাম: ${formData.name || "-"}%0Aবিষয়: ${
      formData.subject || "-"
    }%0Aবার্তা: ${formData.message || "-"}`
    window.open(`https://wa.me/${whatsapp}?text=${text}`, "_blank")
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        আমাদের বার্তা পাঠান
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">নাম *</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="email">ইমেইল *</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="mt-1" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">ফোন</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="subject">বিষয় *</Label>
            <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="mt-1" />
          </div>
        </div>

        <div>
          <Label htmlFor="message">বার্তা *</Label>
          <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="mt-1" />
        </div>

        <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700">
          {loading ? "পাঠানো হচ্ছে..." : "বার্তা পাঠান"}
        </Button>

        {/* WhatsApp সরাসরি */}
        <button
          type="button"
          onClick={handleWhatsApp}
          className="w-full flex items-center justify-center gap-2 border border-green-600 text-green-700 hover:bg-green-50 py-2 rounded-lg font-medium transition"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp-এ পাঠান
        </button>
      </form>
    </div>
  )
}