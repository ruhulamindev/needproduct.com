import { Users, ShoppingBag, DollarSign, Package } from "lucide-react"

const stats = [
  { label: "মোট বিক্রি", value: "৳1,24,500", icon: DollarSign, color: "bg-green-100 text-green-600" },
  { label: "মোট অর্ডার", value: "356", icon: ShoppingBag, color: "bg-blue-100 text-blue-600" },
  { label: "মোট পণ্য", value: "48", icon: Package, color: "bg-purple-100 text-purple-600" },
  { label: "মোট গ্রাহক", value: "150", icon: Users, color: "bg-orange-100 text-orange-600" },
]

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="bg-white p-5 rounded-xl shadow-sm border border-slate-100"
          >
            <div className={`inline-flex p-2.5 rounded-lg mb-3 ${stat.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
          </div>
        )
      })}
    </div>
  )
}