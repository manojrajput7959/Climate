import React, { useMemo, memo } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import { Chart } from "chart.js";

Chart.register(zoomPlugin);

const PM10And25 = ({ airQuality }) => {
  const hourly = airQuality?.hourly;
  if (!hourly) return <div className="text-white p-4">Loading air quality...</div>;

  const chartData = useMemo(() => ({
    labels: hourly.time.map(t => t.split("T")[1]),
    datasets: [
      {
        label: "PM10 (µg/m³)",
        data: hourly.pm10,
        borderColor: "orange",
        backgroundColor: "rgba(255,165,0,0.15)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 3
      },
      {
        label: "PM2.5 (µg/m³)",
        data: hourly.pm2_5,
        borderColor: "red",
        backgroundColor: "rgba(255,99,71,0.15)",
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
        text: "PM10 & PM2.5",
        align: "start",
        color: "#fff",
        font: { size: 26, weight: "bold" }
      },
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false, backgroundColor: "rgba(0,0,0,0.85)", titleColor: "#fff", bodyColor: "#ddd", padding: 10 },
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
    <div className="w-full md:w-[45vw] rounded-md scrollbar-custom h-[40vh] md:h-[45vh] overflow-x-auto border-2 border-zinc-600">
      <div className="w-[90rem] md:w-[125rem] px-4 h-full">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default memo(PM10And25);