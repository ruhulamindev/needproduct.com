"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function SalesChart() {
  const data = {
    labels: ["জানু", "ফেব", "মার্চ", "এপ্রিল", "মে", "জুন"],
    datasets: [
      {
        label: "বিক্রি (৳)",
        data: [12000, 19000, 30000, 50000, 23000, 34000],
        borderColor: "rgb(220, 38, 38)", // red-600
        backgroundColor: "rgba(220, 38, 38, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: false },
    },
    scales: {
      y: {
        ticks: {
          callback: (value: any) => `৳${value}`,
        },
      },
    },
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold mb-4 text-slate-800">মাসিক বিক্রি</h3>
      <Line options={options} data={data} />
    </div>
  )
}