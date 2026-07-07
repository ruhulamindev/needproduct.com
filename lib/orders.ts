// lib/orders.ts

export type OrderItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export type Order = {
  id: string
  date: string
  customer: { name: string; phone: string; address: string; zone: string }
  items: OrderItem[]
  subtotal: number
  discount: number
  couponCode?: string
  deliveryCharge: number
  total: number
  paymentMethod: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
}

const KEY = "orders"

// সব order পড়া
export function getOrders(): Order[] {
  if (typeof window === "undefined") return []
  try {
    const saved = localStorage.getItem(KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

// নতুন order যোগ করা
export function saveOrder(order: Order) {
  if (typeof window === "undefined") return
  const orders = getOrders()
  orders.unshift(order) // নতুনটা উপরে
  localStorage.setItem(KEY, JSON.stringify(orders))
}

// order ID বানানো (যেমন NP-240107-4821)
export function generateOrderId() {
  const d = new Date()
  const date = `${d.getFullYear().toString().slice(2)}${String(
    d.getMonth() + 1
  ).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `NP-${date}-${rand}`
}