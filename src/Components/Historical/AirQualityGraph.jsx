import React, { useMemo, memo } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const AirQualityGraph = ({ rangeAirQuality }) => {
  const hourly = rangeAirQuality?.hourly;
  if (!hourly) return <p>Loading Air Quality chart...</p>;

  const chartData = useMemo(() => ({
    labels: hourly.time.map(t =>
      new Date(t).toLocaleString("en-IN", { day: "2-digit", month: "short" })
    ),
    datasets: [
      {
        label: "PM10 (µg/m³)",
        data: hourly.pm10,
        borderColor: "purple",
        backgroundColor: "rgba(128,0,128,0.2)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 2,
      },
      {
        label: "PM2.5 (µg/m³)",
        data: hourly.pm2_5,
        borderColor: "green",
        backgroundColor: "rgba(0,128,0,0.2)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  }), [hourly]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      title: {
        display: true,
        text: "Air Quality (PM10 & PM2.5)",
        align: "start",
        color: "#fff",
        font: { size: 22, weight: "bold" },
      },
      legend: { position: "top" },
    },
    scales: {
      x: { ticks: { maxRotation: 40, autoSkip: true } },
      y: { beginAtZero: true },
    },
  }), []);

  return (
    <div className="lg:w-[96vw] w-full h-[45vh] scrollbar-custom lg:h-[45vh] rounded-md border-2 border-zinc-600 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
      <div className="min-w-[1000vw] h-full lg:px-4 px-2">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default memo(AirQualityGraph);