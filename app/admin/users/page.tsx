"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import UsersTable from "@/components/admin/users/users-table"
import { api } from "@/lib/api"
import { User } from "@/types/user"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  // ===== API থেকে সব customer =====
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

  // active/inactive toggle
  const toggleActiveStatus = async (id: string) => {
    const prev = users
    // optimistic — সাথে সাথে UI-তে বদলাই
    setUsers((list) =>
      list.map((u) => (u.id === id ? { ...u, is_active: !u.is_active } : u))
    )
    try {
      await api(`/users/${id}/toggle-active`, { method: "PATCH" })
    } catch (err: any) {
      setUsers(prev) // fail করলে ফেরাও
      alert(err.message || "Status বদলাতে সমস্যা হয়েছে")
    }
  }

  // delete
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
    <AdminLayout>
      <UsersTable
        users={users}
        loading={loading}
        onToggleActive={toggleActiveStatus}
        onDelete={deleteUser}
      />
    </AdminLayout>
  )
}