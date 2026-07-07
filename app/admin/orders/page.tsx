import AdminLayout from "@/components/admin/admin-layout"
import OrdersTable from "@/components/admin/order/orders-table"

export default function AdminOrdersPage() {
  return (
    <AdminLayout>
      <OrdersTable />
    </AdminLayout>
  )
}