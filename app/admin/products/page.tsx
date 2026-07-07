import AdminLayout from "@/components/admin/admin-layout"
import ProductsTable from "@/components/admin/product/products-table" // নিশ্চিত করো ঠিকমত ইমপোর্ট করেছো
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function AdminProducts() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
        </div>
        {/* ProductsTable এখানে রেন্ডার করো */}
        <ProductsTable />
      </div>
    </AdminLayout>
  )
}
