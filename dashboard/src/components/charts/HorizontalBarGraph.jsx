"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DynamicBarChart = ({
  title = "Bar Chart",
  labels = [],
  dataValues = [],
  colors = [],
  hoverColors = [],
  label = "Dataset",
  indexAxis = "y", // "y" for horizontal, "x" for vertical
  height = "300px",
}) => {
  const data = {
    labels,
    datasets: [
      {
        label,
        data: dataValues,
        backgroundColor: colors,
        hoverBackgroundColor: hoverColors,
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

  const options = {
    indexAxis,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: title,
        color: "#0D525C",
        font: { size: 16, weight: "600" },
        align: "start",
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(0,0,0,0.05)",
          drawBorder: false,
        },
        ticks: { color: "#444" },
      },
      y: {
        grid: { display: false, drawBorder: false },
        border: { display: false },
        ticks: { color: "#444" },
      },
    },
  };

  return (
    <div style={{ height }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DynamicBarChart;