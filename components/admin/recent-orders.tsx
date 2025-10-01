export default function RecentOrders() {
  const orders = [
    { id: 1, customer: "John Doe", date: "2025-06-20", total: "$120.00", status: "Completed" },
    { id: 2, customer: "Jane Smith", date: "2025-06-19", total: "$75.50", status: "Pending" },
    { id: 3, customer: "Alice Johnson", date: "2025-06-18", total: "$210.30", status: "Shipped" },
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-bold mb-4">Recent Orders</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Order ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Customer</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Total</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                <td className="border border-gray-300 px-4 py-2">{order.customer}</td>
                <td className="border border-gray-300 px-4 py-2">{order.date}</td>
                <td className="border border-gray-300 px-4 py-2">{order.total}</td>
                <td className="border border-gray-300 px-4 py-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
