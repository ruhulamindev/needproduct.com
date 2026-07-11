"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const labelMap: Record<string, string> = {
  pending: "অপেক্ষমাণ",
  processing: "প্রক্রিয়াধীন",
  shipped: "পাঠানো",
  delivered: "সম্পন্ন",
  cancelled: "বাতিল",
}

const colorMap: Record<string, string> = {
  pending: "rgba(234, 179, 8, 0.7)",
  processing: "rgba(59, 130, 246, 0.7)",
  shipped: "rgba(168, 85, 247, 0.7)",
  delivered: "rgba(34, 197, 94, 0.7)",
  cancelled: "rgba(239, 68, 68, 0.7)",
}

export default function SalesChart() {
  const [data, setData] = useState<{ status: string; count: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api<{ data: { ordersByStatus: { status: string; count: number }[] } }>("/orders/stats")
      .then((res) => setData(res.data.ordersByStatus || []))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }, [])

  const order = ["pending", "processing", "shipped", "delivered", "cancelled"]
  const sorted = order
    .map((s) => data.find((d) => d.status === s))
    .filter(Boolean) as { status: string; count: number }[]

  const chartData = {
    labels: sorted.map((d) => labelMap[d.status] || d.status),
    datasets: [
      {
        label: "অর্ডার সংখ্যা",
        data: sorted.map((d) => d.count),
        backgroundColor: sorted.map((d) => colorMap[d.status]),
        borderRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold mb-4 text-slate-800">অর্ডার Status</h3>
      {loading ? (
        <div className="h-64 bg-slate-100 rounded animate-pulse" />
      ) : sorted.length === 0 ? (
        <p className="text-center py-16 text-slate-400 text-sm">এখনো কোনো অর্ডার নেই।</p>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  )
}