"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function LogoutPage() {
  const router = useRouter()
  const { logout } = useAuth()

  useEffect(() => {
    logout() // context থেকে logout
    localStorage.removeItem("savedUser")
    localStorage.removeItem("savedPass")

    alert("✅ Logout successful!")
    router.push("/")
  }, [logout, router])

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-700 text-lg">
      Logging out...
    </div>
  )
}
