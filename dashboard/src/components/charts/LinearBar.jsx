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
 * @property {number[] | number[][]} [dataValues=[]] - Data for each label (can be a 1D or 2D array for stacking)
 * @property {string[] | string[][]} [colors=[]] - Colors for the bars 
 * @property {string[] | string[][]} [hoverColors=[]] - Hover colors for the bars
 * @property {string | string[]} [label="Dataset"] - The label for the entire dataset
 * @property {"y"|"x"} [indexAxis="y"] - Axis on which to draw the bars ("y" for horizontal, "x" for vertical).
 * @property {boolean} [stacked = false] - Enables basic stacking for multi-series data.
 * @property {boolean} [isPercentageChart = false] - If true, configures the value axis (the one NOT indexAxis) to show 0% to 100% ticks.
 * @property {number} [barThickness = 30] - the thickness of the linear bar
 * @property {string} [height = "300px"] - The CSS height for the chart container.
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
  stacked = false, 
  isPercentageChart = true, //100% stacking visualization
  barThickness = 30,
  height = "300px", // FIX: Added height back for the style object
}) => {
  // Handle single or multiple datasets automatically
  const datasets = Array.isArray(dataValues[0])
    ? dataValues.map((values, i) => ({
        label: Array.isArray(label) ? label[i] : `Dataset ${i + 1}`,
        data: values,
        backgroundColor: Array.isArray(colors[i]) ? colors[i] : colors[i], // Handle array of arrays if needed
        hoverBackgroundColor: Array.isArray(hoverColors[i]) ? hoverColors[i] : hoverColors[i], // Handle array of arrays if needed
        borderRadius: 6,
        barThickness,
        stack: 'stack-group-1', // Set a common stack ID for proper grouping
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

  // --- Scale Configuration for 100% Stacking ---
  
  // This function creates the configuration for the value axis (which should show percentages)
  const getPercentageAxisConfig = () => ({
    min: 0,
    max: 100,
    stacked: true, // Must be stacked
    grid: { color: "rgba(0,0,0,0.05)", drawBorder: false },
    ticks: { 
        color: "#444",
        // FIX: Callback to format ticks as percentages
        callback: function(value) {
            return value + '%';
        }
    },
    border: { display: false },
  });

  // This function creates the configuration for the category axis
  const getCategoryAxisConfig = () => ({
    stacked: stacked || isPercentageChart, // Must be stacked if percentage
    grid: { display: false, drawBorder: false },
    ticks: { color: "#444" },
    border: { display: false },
  });

  // Determine which axis is the value axis (X for horizontal, Y for vertical)
  const isHorizontal = indexAxis === "y";
  
  const scaleX = isPercentageChart && isHorizontal ? getPercentageAxisConfig() : getCategoryAxisConfig();
  const scaleY = isPercentageChart && !isHorizontal ? getPercentageAxisConfig() : getCategoryAxisConfig();
  
  // Apply standard/non-percentage config if not a percentage chart
  if (!isPercentageChart) {
    scaleX.stacked = stacked;
    scaleY.stacked = stacked;
    // Remove min/max properties if not percentage chart
    delete scaleX.min;
    delete scaleX.max;
    delete scaleY.min;
    delete scaleY.max;
    // Remove tick callback if not percentage chart
    delete scaleX.ticks.callback;
    delete scaleY.ticks.callback;
    
    // Re-apply standard grid/tick settings
    scaleX.grid = { color: "rgba(0,0,0,0.05)", drawBorder: false };
    scaleX.ticks = { color: "#444" };
    scaleY.grid = { display: false, drawBorder: false };
    scaleY.ticks = { color: "#444" };
  }
  
  const options = {
    indexAxis,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        // Display legend if stacked (either 100% or regular) or if multi-dataset
        display: isPercentageChart || stacked || Array.isArray(dataValues[0]),
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
      x: scaleX, // FIX: Apply dynamic scale config
      y: scaleY, // FIX: Apply dynamic scale config
    },
  };

  return (
    <div style={{ height }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DynamicBarChart;