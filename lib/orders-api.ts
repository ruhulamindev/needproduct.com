// lib/orders-api.ts
import { api } from "./api"

type OrderItemInput = { productId: string; quantity: number }

type CreateOrderInput = {
  customerName: string
  customerPhone: string
  customerAddress: string
  deliveryZone: "dhaka" | "outside"
  couponCode?: string
  items: OrderItemInput[]
}

/** নতুন অর্ডার — backend-এ database-এ save হবে */
export async function createOrder(input: CreateOrderInput) {
  const res = await api<{ data: any }>("/orders", {
    method: "POST",
    body: JSON.stringify({ ...input, paymentMethod: "cod" }),
  })
  return res.data
}

/** নিজের সব অর্ডার (login করা থাকতে হবে) */
export async function fetchMyOrders() {
  const res = await api<{ data: any[] }>("/orders/my")
  return res.data
}