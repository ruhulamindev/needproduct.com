"use client"

import { useState, useEffect } from "react"
import { Pencil, Trash2, Plus, Search } from "lucide-react"
import { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import AddProductModal from "./add-product-modal"

const DEMO_PRODUCTS: Product[] = [
  { id: "1", name: "Apple iPhone 14", price: 899, discount: 10, stock: 10, rating: 4.5, category: "ethnic", image: "/images/download (2).png", description: "Latest iPhone", reviews: 120, inStock: true },
  { id: "2", name: "Dell XPS 13", price: 1399, discount: 0, stock: 8, rating: 4.2, category: "premium", image: "/images/download (2).png", description: "Laptop", reviews: 80, inStock: true },
  { id: "3", name: "Sports Shoes", price: 120, discount: 20, stock: 20, rating: 4.6, category: "sport", image: "/images/download (3).png", description: "Athletic shoes", reviews: 80, inStock: true },
  { id: "4", name: "Modern Lamp", price: 90, discount: 0, stock: 0, rating: 4.3, category: "modern", image: "/images/download (3).png", description: "Design lamp", reviews: 40, inStock: false },
]

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    setProducts(DEMO_PRODUCTS)
  }, [])

  const handleAddOrUpdate = (product: Product) => {
    if (editingProduct) {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)))
    } else {
      setProducts((prev) => [...prev, { ...product, id: Date.now().toString() }])
    }
    setEditingProduct(null)
    setModalOpen(false)
  }

  const handleDelete = (id: string) => {
    if (confirm("এই পণ্যটি মুছে ফেলতে চান?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
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

              {/* Actions */}
              <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleEdit(product)}
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleDelete(product.id)}
                >
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

      {/* Modal */}
      {modalOpen && (
        <AddProductModal
          onSave={handleAddOrUpdate}
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