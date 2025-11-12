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

/**
 * @typedef {Object} DynamicBarChartProps
 * @property {string} [title="Bar Chart"] - chart title
 * @property {string[]} [labels=[]] - Chart labels like categories, names, etc
 * @property {number[]} [dataValues=[]] - Data for each label
 * @property {string[]} [colors=[]] - Colors for the bars 
 * @property {string[]} [hoverColors=[]] - Hover colors for the bars
 * @property {string} [label="Dataset"] - The label for the entire dataset
 * @property {"y"|"x"} [indexAxis="y"] - Axis on which to draw the bars ("y" for horizontal, "x" for vertical).
 * @property {string} [height="300px"] - CSS height value for the chart container
 */

/**
 * Renders the bar chart using react-chartjs-2
 * @param {DynamicBarChartProps} props
 */

const DynamicBarChart = ({
  title = "Bar Chart",
  labels = [],
  dataValues = [],
  colors = [],
  hoverColors = [],
  label = "Dataset",
  indexAxis = "y", // "y" for horizontal, "x" for vertical
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
        font: { size: 18, weight: "700" },
        align: "start",
        padding: { bottom: 30 }
      },
    },
    scales: {
      x: {
        grid: {
          ...(indexAxis === 'x' && {
          display: false
        }),
        drawBorder: false,
        color: "#9999995b",
        lineWidth: 2
        },
        
        ticks: { color: "#999" },
      },
      y: {
        grid: {
          ...(indexAxis === 'y' && {
            display: false
          }),
          color: "#9999995b",
          drawBorder: false,
          lineWidth: 2
        },
        border: { display: false },
        ticks: { color: "#999" },
      },
    },
  };
  // border-light-grey
  return (
    <div className="p-6 bg-white shadow-xl rounded-xl border transition-shadow hover:shadow-2xl">
      <div className="h-80 w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DynamicBarChart;