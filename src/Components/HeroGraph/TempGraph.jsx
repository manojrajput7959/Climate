import React, { memo, useMemo } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import { Chart } from "chart.js";

Chart.register(zoomPlugin);

const TempGraph = ({ weather }) => {
  const hourlyData = weather?.hourly;
  if (!hourlyData) return null;

  const chartData = useMemo(() => ({
    labels: hourlyData.time.map(t => t.split("T")[1]),
    datasets: [
      {
        label: "Temperature (°C)",
        data: hourlyData.temperature_2m,
        borderColor: "rgb(245,158,11)",
        backgroundColor: "rgba(245,158,11,0.15)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 3
      }
    ]
  }), [hourlyData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      title: {
        display: true,
        text: "Temperature",
        color: "#fff",
        align: "start",
        font: { size: 26, weight: "bold" }
      },
      legend: { display: true },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0,0,0,0.85)",
        titleColor: "#fff",
        bodyColor: "#ddd",
        padding: 10
      },
      zoom: {
        pan: { enabled: true, mode: "x" },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          drag: { enabled: true },
          mode: "x"
        }
      }
    },
    scales: {
      x: { ticks: { autoSkip: false } },
      y: { beginAtZero: false }
    }
  };

  return (
    <div className="w-full md:w-[50vw] rounded-md scrollbar-custom h-[40vh] md:h-[45vh] overflow-x-auto border-2 border-zinc-600">
      <div className="w-[90rem] md:w-[125rem] px-5 h-full">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default memo(TempGraph);