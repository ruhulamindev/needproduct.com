"use client"

import { useState, useEffect } from "react"
import { Pencil, Trash2, Plus, Search } from "lucide-react"
import { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { fetchProducts } from "@/lib/products-api"
import AddProductModal from "./add-product-modal"

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState("")

  // ===== API থেকে product লোড =====
  const loadProducts = async () => {
    try {
      setLoading(true)
      const { products } = await fetchProducts({ limit: 100 })
      setProducts(products)
    } catch (err) {
      console.error("Failed to load products:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  // add/edit modal থেকে save হলে — list আবার লোড করি (সহজ আর নির্ভরযোগ্য)
  const handleSaved = () => {
    setEditingProduct(null)
    setModalOpen(false)
    loadProducts()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("এই পণ্যটি মুছে ফেলতে চান?")) return
    try {
      await api(`/products/${id}`, { method: "DELETE" })
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch (err: any) {
      alert(err.message || "মুছতে সমস্যা হয়েছে")
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setModalOpen(true)
  }

  const handleAddNew = () => {
    setEditingProduct(null)
    setModalOpen(true)
  }

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-xl md:text-3xl font-bold text-slate-800">
          Products{" "}
          <span className="text-base md:text-lg font-medium text-slate-400">
            ({products.length})
          </span>
        </h1>
        <Button onClick={handleAddNew} className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search */}
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="পণ্য খুঁজুন..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Loading */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* ===== Desktop Table ===== */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-100">
            <table className="min-w-full text-sm text-left text-slate-700">
              <thead className="bg-slate-50 border-b text-xs text-slate-500 uppercase">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Discount</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length > 0 ? (
                  filtered.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded border" />
                      </td>
                      <td className="px-4 py-3 font-medium">{product.name}</td>
                      <td className="px-4 py-3">৳{product.price}</td>
                      <td className="px-4 py-3">
                        {product.discount ? (
                          <span className="text-red-600 font-medium">{product.discount}%</span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={(product.stock ?? 0) > 0 ? "text-green-600" : "text-red-600"}>
                          {product.stock ?? 0}
                        </span>
                      </td>
                      <td className="px-4 py-3 capitalize">{product.category}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-slate-400">
                      কোনো পণ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ===== Mobile Cards ===== */}
          <div className="md:hidden space-y-3">
            {filtered.length > 0 ? (
              filtered.map((product) => (
                <div key={product.id} className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
                  <div className="flex gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded border shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-xs text-slate-500 capitalize mt-0.5">
                        {product.category}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="font-bold text-slate-800 text-sm">৳{product.price}</span>
                        {product.discount ? (
                          <span className="text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded">
                            -{product.discount}%
                          </span>
                        ) : null}
                        <span
                          className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                            (product.stock ?? 0) > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          Stock: {product.stock ?? 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => handleEdit(product)}>
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" className="flex-1" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-10 text-slate-400">কোনো পণ্য পাওয়া যায়নি।</p>
            )}
          </div>
        </>
      )}

      {/* Modal */}
      {modalOpen && (
        <AddProductModal
          onSaved={handleSaved}
          editingProduct={editingProduct}
          onClose={() => {
            setModalOpen(false)
            setEditingProduct(null)
          }}
        />
      )}
    </div>
  )
}