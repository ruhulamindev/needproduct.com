"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import UsersTable from "@/components/admin/users/users-table"
import { User } from "@/types/user"

// demo data (পরে backend থেকে আসবে)
const DEMO_USERS: User[] = [
  {
    id: "1",
    name: "Ruhul Amin",
    email: "ruhul@example.com",
    createdAt: "2025-12-20T10:00:00Z",
    updatedAt: "2026-01-02T15:00:00Z",
    isActive: true,
    profilePicture: "",
    phoneNumber: "+8801712345678",
  },
  {
    id: "2",
    name: "করিম উদ্দিন",
    email: "karim@example.com",
    createdAt: "2025-12-21T12:00:00Z",
    updatedAt: "2026-01-03T09:00:00Z",
    isActive: true,
    profilePicture: "",
    phoneNumber: "+8801812345678",
  },
  {
    id: "3",
    name: "সালমা বেগম",
    email: "salma@example.com",
    createdAt: "2025-12-22T12:00:00Z",
    updatedAt: "2026-01-03T09:00:00Z",
    isActive: false,
    profilePicture: "",
    phoneNumber: "",
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(DEMO_USERS)

  const toggleActiveStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    )
  }

  const deleteUser = (id: string) => {
    if (confirm("এই গ্রাহককে মুছে ফেলতে চান?")) {
      setUsers((prev) => prev.filter((user) => user.id !== id))
    }
  }

  return (
    <AdminLayout>
      <UsersTable
        users={users}
        onToggleActive={toggleActiveStatus}
        onDelete={deleteUser}
      />
    </AdminLayout>
  )
}