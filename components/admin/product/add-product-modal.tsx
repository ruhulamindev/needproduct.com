"use client"

import { useState, useEffect } from "react"
import { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { X } from "lucide-react"

type Props = {
  onSaved: () => void
  editingProduct: Product | null
  onClose: () => void
}

// form-এ সব string — তাই 0 লেগে থাকে না
type FormState = {
  name: string
  price: string
  discount: string
  stock: string
  category: string
  image: string
  description: string
  rating: string
  reviews: string
}

const EMPTY: FormState = {
  name: "",
  price: "",
  discount: "",
  stock: "",
  category: "",
  image: "",
  description: "",
  rating: "",
  reviews: "",
}

export default function AddProductModal({ onSaved, editingProduct, onClose }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (editingProduct) {
      // edit — আসল মান বসাই (0 হলে খালি দেখাই)
      setForm({
        name: editingProduct.name || "",
        price: editingProduct.price ? String(editingProduct.price) : "",
        discount: editingProduct.discount ? String(editingProduct.discount) : "",
        stock: editingProduct.stock ? String(editingProduct.stock) : "",
        category: editingProduct.category || "",
        image: editingProduct.image || "",
        description: editingProduct.description || "",
        rating: editingProduct.rating ? String(editingProduct.rating) : "",
        reviews: editingProduct.reviews ? String(editingProduct.reviews) : "",
      })
    } else {
      setForm(EMPTY)
    }
  }, [editingProduct])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (saving) return

    // ===== Validation =====
    const price = Number(form.price)
    const stock = Number(form.stock)
    const discount = Number(form.discount) || 0

    if (!form.name.trim()) {
      setError("পণ্যের নাম দিন")
      return
    }
    if (!form.price || price < 1) {
      setError("দাম কমপক্ষে ৳1 হতে হবে")
      return
    }
    if (!form.stock || stock < 1) {
      setError("স্টক কমপক্ষে 1 হতে হবে")
      return
    }
    if (discount < 0 || discount > 100) {
      setError("ছাড় 0 থেকে 100-এর মধ্যে হতে হবে")
      return
    }
    if (!form.category.trim()) {
      setError("Category দিন")
      return
    }
    if (!form.image.trim()) {
      setError("ছবির URL/path দিন")
      return
    }

    setSaving(true)
    setError("")

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price,
      discount,
      stock,
      category: form.category.trim(),
      image: form.image.trim(),
      rating: Number(form.rating) || 0,
      reviews: Number(form.reviews) || 0,
    }

    try {
      if (editingProduct) {
        await api(`/products/${editingProduct.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        })
      } else {
        await api("/products", {
          method: "POST",
          body: JSON.stringify(payload),
        })
      }
      onSaved()
    } catch (err: any) {
      setError(err.message || "সংরক্ষণে সমস্যা হয়েছে")
      setSaving(false)
    }
  }

  const inputClass =
    "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white">
          <h3 className="text-lg font-bold text-slate-800">
            {editingProduct ? "পণ্য সম্পাদনা" : "নতুন পণ্য যোগ"}
          </h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">পণ্যের নাম *</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="যেমন: Samsung Galaxy A54" className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">দাম (৳) *</label>
              <input name="price" type="number" min="1" value={form.price} onChange={handleChange} placeholder="যেমন: 1200" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">ছাড় (%)</label>
              <input name="discount" type="number" min="0" max="100" value={form.discount} onChange={handleChange} placeholder="0" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">স্টক *</label>
              <input name="stock" type="number" min="1" value={form.stock} onChange={handleChange} placeholder="যেমন: 10" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
              <input name="category" value={form.category} onChange={handleChange} placeholder="যেমন: mobile" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">ছবির URL/path *</label>
            <input name="image" value={form.image} onChange={handleChange} placeholder="/images/product.png" className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Rating (0-5)</label>
              <input name="rating" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={handleChange} placeholder="0" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Reviews</label>
              <input name="reviews" type="number" min="0" value={form.reviews} onChange={handleChange} placeholder="0" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">বিবরণ</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="পণ্যের বিবরণ..." className={inputClass} />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={saving} className="flex-1 bg-red-600 hover:bg-red-700">
              {saving ? "সংরক্ষণ হচ্ছে..." : editingProduct ? "আপডেট করুন" : "যোগ করুন"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              বাতিল
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}