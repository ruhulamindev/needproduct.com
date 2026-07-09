"use client"

import { useState } from "react"
import { User } from "@/types/user"
import { Button } from "@/components/ui/button"
import { Trash2, Search, Mail, Phone } from "lucide-react"

interface UsersTableProps {
  users: User[]
  onToggleActive: (id: string) => void
  onDelete: (id: string) => void
}

export default function UsersTable({ users, onToggleActive, onDelete }: UsersTableProps) {
  const [search, setSearch] = useState("")

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.phoneNumber || "").includes(search)
  )

  return (
    <div className="space-y-5">
      <h1 className="text-xl md:text-3xl font-bold text-slate-800">
        Users{" "}
        <span className="text-base md:text-lg font-medium text-slate-400">
          ({users.length})
        </span>
      </h1>

      {/* Search */}
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="নাম, ইমেইল বা ফোন..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* ===== Desktop Table ===== */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-100">
        <table className="min-w-full text-sm text-left text-slate-700">
          <thead className="bg-slate-50 border-b text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3">Profile</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length > 0 ? (
              filtered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3 text-slate-600">{user.email}</td>
                  <td className="px-4 py-3 text-slate-600">{user.phoneNumber || "—"}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {new Date(user.createdAt).toLocaleDateString("bn-BD")}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onToggleActive(user.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        user.isActive ? "bg-green-500" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          user.isActive ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <Button variant="destructive" size="sm" onClick={() => onDelete(user.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-10 text-slate-400">
                  কোনো গ্রাহক পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile Cards ===== */}
      <div className="md:hidden space-y-3">
        {filtered.length > 0 ? (
          filtered.map((user) => (
            <div key={user.id} className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
              <div className="flex gap-3">
                {/* Avatar */}
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm text-slate-800 truncate">
                      {user.name}
                    </p>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${
                        user.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 truncate">
                    <Mail className="w-3 h-3 shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 shrink-0" />
                    {user.phoneNumber || "—"}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    যোগদান: {new Date(user.createdAt).toLocaleDateString("bn-BD")}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleActive(user.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      user.isActive ? "bg-green-500" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        user.isActive ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span className="text-xs text-slate-500">Active</span>
                </div>

                <Button variant="destructive" size="sm" onClick={() => onDelete(user.id)}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-10 text-slate-400">কোনো গ্রাহক পাওয়া যায়নি।</p>
        )}
      </div>
    </div>
  )
}