// lib/requests-api.ts
import { api } from "./api"

export async function createRequest(input: {
  productName: string
  description?: string
  budget?: number
  phone?: string
}) {
  const res = await api<{ data: any }>("/requests", {
    method: "POST",
    body: JSON.stringify(input),
  })
  return res.data
}

export async function fetchMyRequests() {
  const res = await api<{ data: any[] }>("/requests/my")
  return res.data
}

/** admin — সব request */
export async function fetchAllRequests() {
  const res = await api<{ data: any[] }>("/requests")
  return res.data
}

/** admin — status বদলানো */
export async function updateRequestStatus(id: string, status: string) {
  const res = await api<{ data: any }>(`/requests/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  })
  return res.data
}