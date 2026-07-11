// lib/profile-api.ts
import { api } from "./api"

export async function updateProfile(input: {
  name?: string
  phone?: string
  address?: string
  delivery_zone?: string
}) {
  const res = await api<{ data: any }>("/users/me", {
    method: "PATCH",
    body: JSON.stringify(input),
  })
  return res.data
}