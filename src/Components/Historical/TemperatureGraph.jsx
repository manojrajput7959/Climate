import React, { useMemo, memo } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import { Chart } from "chart.js";

// Register the zoom plugin
Chart.register(zoomPlugin);

const TemperatureGraph = ({ rangeWeather }) => {
  const daily = rangeWeather?.daily;

  // Memoize chart data
  const chartData = useMemo(() => {
    if (!daily) return null;

    const meanTemp = daily.temperature_2m_max.map(
      (max, i) => (max + daily.temperature_2m_min[i]) / 2
    );

    return {
      labels: daily.time.map(d =>
        new Date(d).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      ),
      datasets: [
        {
          label: "Max Temp (°C)",
          data: daily.temperature_2m_max,
          borderColor: "red",
          backgroundColor: "rgba(255,99,71,0.2)",
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
        },
        {
          label: "Min Temp (°C)",
          data: daily.temperature_2m_min,
          borderColor: "blue",
          backgroundColor: "rgba(0,123,255,0.2)",
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
        },
        {
          label: "Mean Temp (°C)",
          data: meanTemp,
          borderColor: "orange",
          backgroundColor: "rgba(255,165,0,0.2)",
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.3,
          pointRadius: 3,
        },
      ],
    };
  }, [rangeWeather]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        title: {
          display: true,
          text: "Temperature Overview (Mean, Max, & Min)",
          align: "start",
          color: "#fff",
          font: { size: 22, weight: "bold" },
        },
        legend: { position: "top" },
        zoom: {
          pan: { enabled: true, mode: "x" },
          zoom: {
            wheel: { enabled: true },
            pinch: { enabled: true },
            drag: { enabled: true },
            mode: "x",
          },
        },
      },
      scales: {
        x: { ticks: { maxRotation: 40, autoSkip: true } },
        y: { beginAtZero: false },
      },
    }),
    []
  );

  if (!daily || !chartData) return <p>Loading chart...</p>;

  return (
    <div className="w-full md:w-[50vw] rounded-md scrollbar-custom h-[45vh] border-2 border-zinc-600 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
      <div className="min-w-[1000vw] lg:px-4 px-2 h-full">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default memo(TemperatureGraph);