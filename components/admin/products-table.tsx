"use client"

import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import { Product } from "@/types/product"
import AddProductModal from "./add-product-model" // ফাইল নাম ঠিক আছে কিনা চেক করো
import { Button } from "@/components/ui/button"

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // প্রোডাক্ট অ্যাড বা আপডেট করার ফাংশন
  const handleAddOrUpdateProduct = (product: Product) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      )
      setEditingProduct(null)
    } else {
      setProducts([...products, { ...product, id: Date.now().toString() }])
    }
  }

  // প্রোডাক্ট ডিলিট করার ফাংশন
  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
    if (editingProduct?.id === id) {
      setEditingProduct(null)
    }
  }

  // Edit বাটনে ক্লিক করলে Edit মোড চালু করা হয়
  const handleEdit = (product: Product) => {
    setEditingProduct(product)
  }

  return (
    <div className="space-y-6 mt-4">
      <AddProductModal onSave={handleAddOrUpdateProduct} editingProduct={editingProduct} />

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 border-b text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3 max-w-xs truncate">{product.description}</td>
                <td className="px-4 py-3">${product.price}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">{product.rating}</td>
                <td className="px-4 py-3 space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
