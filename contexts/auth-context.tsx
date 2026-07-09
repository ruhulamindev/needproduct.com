"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"
import { api } from "@/lib/api"

// backend-এর সাথে মিলিয়ে role = "user" | "admin"
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (
    name: string,
    email: string,
    password: string,
    phone?: string
  ) => Promise<boolean>
  logout: () => Promise<void>
  loading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ===== page load-এ: cookie আছে কিনা যাচাই (/auth/me) =====
  // refresh দিলেও login থাকবে, কারণ token httpOnly cookie-তে
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await api<{ data: User }>("/auth/me")
        setUser(res.data)
      } catch {
        setUser(null) // token নেই বা মেয়াদ শেষ
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  // ===== Login =====
  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null)
    try {
      const res = await api<{ data: { user: User } }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
      setUser(res.data.user) // token cookie-তে চলে গেছে, আলাদা কিছু করতে হবে না
      return true
    } catch (err: any) {
      setError(err.message || "Login failed")
      return false
    }
  }

  // ===== Register =====
  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string
  ): Promise<boolean> => {
    setError(null)
    try {
      // ১. signup (account বানায়, কিন্তু login করায় না)
      await api("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password, phone }),
      })

      // ২. signup-এর পর সাথে সাথে login (cookie বসাতে)
      const res = await api<{ data: { user: User } }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
      setUser(res.data.user)
      return true
    } catch (err: any) {
      setError(err.message || "Registration failed")
      return false
    }
  }

  // ===== Logout =====
  const logout = async () => {
    try {
      await api("/auth/logout", { method: "POST" }) // backend cookie মুছবে
    } catch {
      // চুপচাপ — যাই হোক, local state পরিষ্কার করি
    }
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}