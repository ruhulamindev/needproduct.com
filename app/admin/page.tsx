import AdminLayout from "@/components/admin/admin-layout"
import DashboardStats from "@/components/admin/dashboard-stats"
import RecentOrders from "@/components/admin/recent-orders"
import SalesChart from "@/components/admin/sales-chart"

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <DashboardStats />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart />
          <RecentOrders />
        </div>
      </div>
    </AdminLayout>
  )
}
