"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import OrderDetailsModal from "./order-details-modal"

interface UserDetails {
  name: string
  email: string
  phone: string
  address?: string
  profilePicture?: string
}

interface Order {
  id: number
  customerDetails: UserDetails
  date: string
  total: string
  status: string
}

export default function OrdersTable() {
  const [orders] = useState<Order[]>([
    {
      id: 1,
      customerDetails: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+880123456789",
        address: "123, Some Street, City, Country",
        profilePicture: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      date: "2025-06-20",
      total: "$120.00",
      status: "Completed"
    },
    {
      id: 2,
      customerDetails: {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+880987654321",
        address: "456, Another St, City, Country",
        profilePicture: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      date: "2025-06-19",
      total: "$75.50",
      status: "Pending"
    },
    {
      id: 3,
      customerDetails: {
        name: "Alice Johnson",
        email: "alice@example.com",
        phone: "+880555555555",
        address: "789, New Ave, City, Country",
        profilePicture: ""
      },
      date: "2025-06-18",
      total: "$210.30",
      status: "Shipped"
    },
  ])

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (order: Order) => {
    setSelectedOrder(order)
    setModalOpen(true)
  }

  const closeModal = () => {
    setSelectedOrder(null)
    setModalOpen(false)
  }

  return (
    <>
      <div className="bg-white p-6 rounded shadow overflow-x-auto">
        <h3 className="text-lg font-bold mb-4">All Orders</h3>
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 border-b text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer Name</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{order.id}</td>
                <td className="px-4 py-3">{order.customerDetails.name}</td>
                <td className="px-4 py-3">{order.date}</td>
                <td className="px-4 py-3">{order.total}</td>
                <td className="px-4 py-3">{order.status}</td>
                <td className="px-4 py-3">
                  <Button size="sm" variant="outline" onClick={() => openModal(order)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <OrderDetailsModal isOpen={modalOpen} onClose={closeModal} order={selectedOrder} />
    </>
  )
}
