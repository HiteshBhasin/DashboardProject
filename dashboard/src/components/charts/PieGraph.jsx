"use client";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function PieGraph({title, labels, dataValues, colors, hoverColors, cutoutPercentage = '60%',}) {
  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: colors,
        hoverBackgroundColor: hoverColors,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: cutoutPercentage, // Dynamic cutout size
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 15,
          color: "#333",
          font: { size: 12 },
        },
      },
      title: {
        display: true,
        text: title, // Dynamic title
        color: "#0D525C",
        font: { size: 18, weight: "700" },
        align: "start",
      },
      tooltip: {
        callbacks: {
          // Custom callback to display percentage in the tooltip
          label: (context) => {
            const label = context.label || "";
            const value = context.parsed; 
            
            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${percentage}%`;
          },
        },
        // General Tooltip styling
        backgroundColor: '#0D525C',
        titleFont: { size: 14, weight: '700' },
        bodyFont: { size: 14 },
        displayColors: false,
        padding: 10,
        cornerRadius: 6,
      },
    },
    animation: { animateScale: true },
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-100 transition-shadow hover:shadow-2xl">
      {/* Use a fixed inner container to ensure the doughnut chart renders correctly */}
      <div className="h-80 w-full flex justify-center items-center">
        <div className="w-64 h-64 md:w-80 md:h-80">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
}