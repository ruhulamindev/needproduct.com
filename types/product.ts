// types/product.ts
export interface Product {
  id: string
  name: string
  description?: string
  price: number
  discount?: number      // % ছাড়
  originalPrice?: number
  image: string
  images?: string[]
  category: string
  rating?: number
  reviews?: number
  stock?: number
  inStock?: boolean
  featured?: boolean
}