import React, { useMemo, memo } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import { Chart } from "chart.js";

Chart.register(zoomPlugin);

const PrecipitationGraph = ({ rangeWeather }) => {
  const daily = rangeWeather?.daily;
  if (!daily) return <p>Loading...</p>;

  const chartData = useMemo(() => ({
    labels: daily.time.map((d) =>
      new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
    ),
    datasets: [
      {
        label: "Daily Precipitation (mm)",
        data: daily.precipitation_sum,
        backgroundColor: "rgba(59,130,246,0.5)",
        borderColor: "rgb(37,99,235)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  }), [rangeWeather]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      title: {
        display: true,
        text: "Daily Precipitation",
        align: "start",
        color: "#fff",
        font: { size: 22, weight: "bold" },
      },
      legend: { display: false },
      zoom: {
        pan: { enabled: true, mode: "x" },
        zoom: { wheel: { enabled: true }, pinch: { enabled: true }, drag: { enabled: true }, mode: "x" },
      },
    },
    scales: {
      x: { ticks: { maxRotation: 40, autoSkip: true } },
      y: { beginAtZero: true, title: { display: true, text: "Precipitation (mm)" } },
    },
  }), []);

  return (
    <div className="w-full md:w-[45vw] h-[45vh] scrollbar-custom border-2 border-zinc-600 rounded-md overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
      <div className="min-w-[500vw] h-full lg:px-4 px-2">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default memo(PrecipitationGraph);