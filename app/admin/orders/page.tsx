import AdminLayout from "@/components/admin/admin-layout"
import OrdersTable from "@/components/admin/orders-table"

export default function OrdersPage() {
  return (
    <AdminLayout>
      <OrdersTable />
    </AdminLayout>
  )
}
