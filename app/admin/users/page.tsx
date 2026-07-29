"use client"

import { useState, useEffect } from "react"
import UsersTable from "@/components/admin/users/users-table"
import { adminApi as api } from "@/lib/api"
import { User } from "@/types/user"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const loadUsers = async () => {
    try {
      setLoading(true)
      const res = await api<{ data: User[] }>("/users")
      setUsers(res.data)
    } catch (err) {
      console.error("Failed to load users:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const toggleActiveStatus = async (id: string) => {
    const prev = users
    setUsers((list) =>
      list.map((u) => (u.id === id ? { ...u, is_active: !u.is_active } : u))
    )
    try {
      await api(`/users/${id}/toggle-active`, { method: "PATCH" })
    } catch (err: any) {
      setUsers(prev)
      alert(err.message || "Status বদলাতে সমস্যা হয়েছে")
    }
  }

  const deleteUser = async (id: string) => {
    if (!confirm("এই গ্রাহককে মুছে ফেলতে চান?")) return
    try {
      await api(`/users/${id}`, { method: "DELETE" })
      setUsers((prev) => prev.filter((u) => u.id !== id))
    } catch (err: any) {
      alert(err.message || "মুছতে সমস্যা হয়েছে")
    }
  }

  return (
    <UsersTable
      users={users}
      loading={loading}
      onToggleActive={toggleActiveStatus}
      onDelete={deleteUser}
    />
  )
}