import React, { useMemo, memo } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import { Chart } from "chart.js";

Chart.register(zoomPlugin);

const SunriseSunsetGraph = ({ rangeWeather }) => {
  const daily = rangeWeather?.daily;
  if (!daily) return <p>Loading...</p>;

  const chartData = useMemo(() => {
    const convertToHours = (time) => {
      const date = new Date(time);
      return date.getHours() + date.getMinutes() / 60;
    };

    return {
      labels: daily.time.map((d) =>
        new Date(d).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        })
      ),
      datasets: [
        {
          label: "Sunrise (IST)",
          data: daily.sunrise.map(convertToHours),
          borderColor: "yellow",
          backgroundColor: "rgba(255,215,0,0.2)",
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
        },
        {
          label: "Sunset (IST)",
          data: daily.sunset.map(convertToHours),
          borderColor: "purple",
          backgroundColor: "rgba(138,43,226,0.2)",
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
        },
      ],
    };
  }, [rangeWeather]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      title: {
        display: true,
        text: "Sunrise & Sunset Timing",
        align: "start",
        color: "#fff",
        font: { size: 22, weight: "bold" },
      },
      legend: { position: "top" },
      zoom: {
        pan: { enabled: true, mode: "x" },
        zoom: { wheel: { enabled: true }, pinch: { enabled: true }, drag: { enabled: true }, mode: "x" },
      },
    },
    scales: {
      x: { ticks: { maxRotation: 40, autoSkip: true } },
      y: {
        title: { display: true, text: "Time (Hours)" },
        ticks: {
          callback: (value) => {
            const hours = Math.floor(value);
            const minutes = Math.round((value - hours) * 60);
            return `${hours}:${minutes.toString().padStart(2, "0")}`;
          },
        },
      },
    },
  }), []);

  return (
    <div className="w-full md:w-[45vw] h-[45vh] scrollbar-custom border-2 border-zinc-600 rounded-md overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
      <div className="min-w-[500vw] h-full lg:px-4 px-2">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default memo(SunriseSunsetGraph);