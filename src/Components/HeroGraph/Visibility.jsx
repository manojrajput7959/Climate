import React, { useMemo, memo } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import { Chart } from "chart.js";

Chart.register(zoomPlugin);

const Visibility = ({ weather }) => {
  const hourly = weather?.hourly;
  if (!hourly) return null;

  const chartData = useMemo(() => ({
    labels: hourly.time.map(t => t.split("T")[1]),
    datasets: [
      {
        label: "Visibility (km)",
        data: hourly.visibility,
        borderColor: "limegreen",
        backgroundColor: "rgba(144,238,144,0.15)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 3
      }
    ]
  }), [hourly]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      title: {
        display: true,
        text: "Visibility",
        align: "start",
        color: "#fff",
        font: { size: 26, weight: "bold" }
      },
      legend: { display: false },
      tooltip: { mode: "index", intersect: false, backgroundColor: "rgba(0,0,0,0.85)" },
      zoom: {
        pan: { enabled: true, mode: "x" },
        zoom: { wheel: { enabled: true }, pinch: { enabled: true }, drag: { enabled: true }, mode: "x" }
      }
    },
    scales: {
      x: { ticks: { autoSkip: false } },
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="w-full md:w-[45vw] scrollbar-custom rounded-md h-[40vh] md:h-[45vh] overflow-x-auto border-2 border-zinc-600">
      <div className="w-[90rem] md:w-[125rem] px-4 h-full">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default memo(Visibility);