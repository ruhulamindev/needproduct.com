// lib/products-api.ts
import { api } from "./api"
import { Product } from "@/types/product"

type ListParams = {
  category?: string
  search?: string
  featured?: boolean
  sort?: string
  page?: number
  limit?: number
}

/** সব product (filter সহ) — { products, meta } ফেরত দেয় */
export async function fetchProducts(params: ListParams = {}) {
  const query = new URLSearchParams()
  if (params.category) query.set("category", params.category)
  if (params.search) query.set("search", params.search)
  if (params.featured) query.set("featured", "true")
  if (params.sort) query.set("sort", params.sort)
  if (params.page) query.set("page", String(params.page))
  if (params.limit) query.set("limit", String(params.limit))

  const qs = query.toString()
  const res = await api<{ data: Product[]; meta?: any }>(
    `/products${qs ? `?${qs}` : ""}`
  )
  return { products: res.data, meta: res.meta }
}

/** একটা product (id দিয়ে) */
export async function fetchProductById(id: string) {
  const res = await api<{ data: Product }>(`/products/${id}`)
  return res.data
}

/** category তালিকা + count */
export async function fetchCategories() {
  const res = await api<{ data: { category: string; count: number }[] }>(
    `/products/categories`
  )
  return res.data
}