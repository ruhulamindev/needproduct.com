"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address?: string;
  profilePicture?: string;
}

interface OrderDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  order: {
    id: number
    customerDetails: UserDetails
    date: string
    total: string
    status: string
  } | null
}

export default function OrderDetailsModal({ isOpen, onClose, order }: OrderDetailsModalProps) {
  if (!order) return null

  const { customerDetails } = order

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order #{order.id} Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            {customerDetails.profilePicture && (
              <img
                src={customerDetails.profilePicture}
                alt={customerDetails.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <p><strong>Name:</strong> {customerDetails.name}</p>
              <p><strong>Email:</strong> <a href={`mailto:${customerDetails.email}`} className="text-blue-600 underline">{customerDetails.email}</a></p>
              <p><strong>Phone:</strong> <a href={`tel:${customerDetails.phone}`} className="text-blue-600 underline">{customerDetails.phone}</a></p>
              {customerDetails.address && <p><strong>Address:</strong> {customerDetails.address}</p>}
            </div>
          </div>

          <div>
            <p><strong>Order Date:</strong> {order.date}</p>
            <p><strong>Total:</strong> {order.total}</p>
            <p><strong>Status:</strong> {order.status}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
