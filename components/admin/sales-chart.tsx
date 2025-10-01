"use client"
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function SalesChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [1200, 1900, 3000, 5000, 2300, 3400],
        borderColor: "rgba(59, 130, 246, 1)", // blue-500
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Sales",
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-bold mb-4">Sales Chart</h3>
      <Line options={options} data={data} />
    </div>
  );
}
