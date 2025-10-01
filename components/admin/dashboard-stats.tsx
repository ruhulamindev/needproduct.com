import { Card } from "@/components/ui/card"

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="p-6 bg-white shadow hover:shadow-md transition-all">
        <h3 className="text-lg font-bold">Total Users</h3>
        <p className="text-2xl mt-2">150</p>
      </Card>
      <Card className="p-6 bg-white shadow hover:shadow-md transition-all">
        <h3 className="text-lg font-bold">Monthly Revenue</h3>
        <p className="text-2xl mt-2">$2,500</p>
      </Card>
      <Card className="p-6 bg-white shadow hover:shadow-md transition-all">
        <h3 className="text-lg font-bold">Orders Today</h3>
        <p className="text-2xl mt-2">25</p>
      </Card>
    </div>
  )
}
