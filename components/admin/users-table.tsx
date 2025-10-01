"use client"

import React from "react"
import { User } from "@/types/user"
import { Button } from "@/components/ui/button"

interface UsersTableProps {
  users: User[]
  onToggleActive: (id: string) => void
  onDelete: (id: string) => void
}

export default function UsersTable({ users, onToggleActive, onDelete }: UsersTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 border-b text-xs text-gray-500 uppercase">
          <tr>
            <th className="px-4 py-3">Profile</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Created At</th>
            <th className="px-4 py-3">Updated At</th>
            <th className="px-4 py-3">Active</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </td>
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.phoneNumber || "-"}</td>
              <td className="px-4 py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-3">{new Date(user.updatedAt).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={user.isActive}
                  onChange={() => onToggleActive(user.id)}
                />
              </td>
              <td className="px-4 py-3 space-x-2">
                <Button variant="destructive" size="sm" onClick={() => onDelete(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
