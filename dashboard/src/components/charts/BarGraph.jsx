"use client";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// Register necessary components from Chart.js (MANDATORY)
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

export default function BarGraph({ title, labels, dataValues, dataLabel, barColor = '#0D525C', hoverColor = '#116e7c'}) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: dataLabel,
        data: dataValues,
        backgroundColor: barColor,
        borderRadius: 6,
        barThickness: 28,
        hoverBackgroundColor: hoverColor,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: title,
        color: '#0D525C',
        font: { size: 18, weight: '700' },
        align: 'start',
        padding: { bottom: 20 },
      },
      tooltip: {
        backgroundColor: barColor,
        titleFont: { size: 14, weight: '700' },
        bodyFont: { size: 14 },
        displayColors: false,
        padding: 10,
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: true },
        ticks: { color: '#444', font: { size: 12 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.08)' },
        ticks: { color: '#444', font: { size: 12 } },
      },
    },
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-xl border border-gray-100 transition-shadow hover:shadow-2xl">
      <div className="h-80 w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};