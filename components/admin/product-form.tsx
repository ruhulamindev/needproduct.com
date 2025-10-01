"use client"

import { useState } from "react"
import { Product } from "@/types/product"
import { Button } from "@/components/ui/button"

interface AddProductFormProps {
  onAdd: (product: Product) => void
}

export default function AddProductForm({ onAdd }: AddProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
    rating: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { name, description, price, stock, category, image, rating } = formData

    if (!name || !description || !price || !stock || !category || !image || !rating) {
      alert("Please fill all fields")
      return
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
      image,
      rating: parseFloat(rating),
    }

    onAdd(newProduct)

    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      image: "",
      rating: "",
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
    >
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 rounded md:col-span-2"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        step="0.1"
        min="0"
        max="5"
        name="rating"
        placeholder="Rating (0-5)"
        value={formData.rating}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <div className="md:col-span-2">
        <Button type="submit" className="w-full">
          Add Product
        </Button>
      </div>
    </form>
  )
}
