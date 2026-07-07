const orders = [
  { id: "NP-2401-4821", customer: "করিম উদ্দিন", date: "2026-01-05", total: 1250, status: "delivered" },
  { id: "NP-2401-4822", customer: "রহিম মিয়া", date: "2026-01-05", total: 755, status: "pending" },
  { id: "NP-2401-4823", customer: "সালমা বেগম", date: "2026-01-04", total: 2103, status: "shipped" },
  { id: "NP-2401-4824", customer: "জামাল হোসেন", date: "2026-01-04", total: 540, status: "processing" },
]

const statusStyle: Record<string, string> = {
  delivered: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  shipped: "bg-purple-100 text-purple-700",
  processing: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
}

const statusLabel: Record<string, string> = {
  delivered: "সম্পন্ন",
  pending: "অপেক্ষমাণ",
  shipped: "পাঠানো হয়েছে",
  processing: "প্রক্রিয়াধীন",
  cancelled: "বাতিল",
}

export default function RecentOrders() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold mb-4 text-slate-800">সাম্প্রতিক অর্ডার</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-500 uppercase border-b">
              <th className="pb-3 pr-4">Order ID</th>
              <th className="pb-3 pr-4">গ্রাহক</th>
              <th className="pb-3 pr-4">মোট</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="py-3 pr-4 font-medium text-slate-700">{order.id}</td>
                <td className="py-3 pr-4 text-slate-600">{order.customer}</td>
                <td className="py-3 pr-4 font-semibold text-green-600">৳{order.total}</td>
                <td className="py-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyle[order.status]}`}>
                    {statusLabel[order.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}