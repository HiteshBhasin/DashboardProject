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
 * @property {boolean} [stacked = false] - for multi-series (e.g. Occupancy)
 * @property {number} [barThickness = 30] - the thickness of the linear bar
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
  stacked = true, 
  barThickness = 30,
}) => {
  // Handle single or multiple datasets automatically
  const datasets = Array.isArray(dataValues[0])
    ? dataValues.map((values, i) => ({
        label: Array.isArray(label) ? label[i] : `Dataset ${i + 1}`,
        data: values,
        backgroundColor: colors[i],
        hoverBackgroundColor: hoverColors[i],
        borderRadius: 6,
        barThickness,
      }))
    : [
        {
          label,
          data: dataValues,
          backgroundColor: colors,
          hoverBackgroundColor: hoverColors,
          borderRadius: 6,
          barThickness,
        },
      ];

  const data = { labels, datasets };

  const options = {
    indexAxis,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: stacked || Array.isArray(dataValues[0]),
        position: "bottom",
        labels: {
          color: "#333",
          boxWidth: 15,
          font: { size: 13 },
        },
      },
      title: {
        display: !!title,
        text: title,
        color: "#0D525C",
        font: { size: 16, weight: "600" },
        align: "start",
      },
    },
    scales: {
      x: {
        stacked,
        grid: {
          color: "rgba(0,0,0,0.05)",
          drawBorder: false,
        },
        ticks: { color: "#444" },
        border: { display: false },
      },
      y: {
        stacked,
        grid: { display: false, drawBorder: false },
        ticks: { color: "#444" },
        border: { display: false },
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