import AdminLayout from "@/components/admin/admin-layout"
import RequestsTable from "@/components/admin/request/requests-table"

export default function AdminRequestsPage() {
  return (
    <AdminLayout>
      <RequestsTable />
    </AdminLayout>
  )
}