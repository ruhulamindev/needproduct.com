import AdminLayout from "@/components/admin/admin-layout"
import ProductsTable from "@/components/admin/products-table" // নিশ্চিত করো ঠিকমত ইমপোর্ট করেছো
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function AdminProducts() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-800">Products</h1>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
        {/* ProductsTable এখানে রেন্ডার করো */}
        <ProductsTable />
      </div>
    </AdminLayout>
  )
}
