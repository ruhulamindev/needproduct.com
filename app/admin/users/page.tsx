"use client"

import React, { useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import UsersTable from "@/components/admin/users-table"
import { User } from "@/types/user"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Ruhul Amin",
      email: "ruhul@example.com",
      createdAt: "2025-06-20T10:00:00Z",
      updatedAt: "2025-06-22T15:00:00Z",
      isActive: true,
      profilePicture: "",
      phoneNumber: "+8801712345678",
    },
    {
      id: "2",
      name: "Jane Doe",
      email: "jane@example.com",
      createdAt: "2025-06-21T12:00:00Z",
      updatedAt: "2025-06-23T09:00:00Z",
      isActive: false,
      profilePicture: "",
      phoneNumber: "",
    },
  ])

  // Active status টগল করার ফাংশন
  const toggleActiveStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    )
  }

  // Delete ফাংশন
  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }

  return (
    <AdminLayout>
      <UsersTable users={users} onToggleActive={toggleActiveStatus} onDelete={deleteUser} />
    </AdminLayout>
  )
}
