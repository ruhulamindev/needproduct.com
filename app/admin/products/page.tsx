import AdminLayout from "@/components/admin/admin-layout"
import ProductsTable from "@/components/admin/product/products-table"

export default function AdminProducts() {
  return (
    <AdminLayout>
      <ProductsTable />
    </AdminLayout>
  )
}