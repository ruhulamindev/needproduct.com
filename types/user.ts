// types/user.ts
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: string          // 👈 নতুন
  delivery_zone?: string    // 👈 নতুন
  role: "user" | "admin"
  is_active: boolean
  created_at: string
  updated_at: string
}