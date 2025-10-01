export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number   // optional
  stock: number
  category: string
  image: string
  images?: string[]    // gallery images (optional)
  rating?: number          // optional
  reviews?: number         // optional
  inStock?: boolean        // optional
}
