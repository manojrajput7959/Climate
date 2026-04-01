import React, { useMemo, memo } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import { Chart } from "chart.js";

Chart.register(zoomPlugin);

const WindGraph = ({ rangeWeather }) => {
  const daily = rangeWeather?.daily;
  if (!daily) return <p>Loading...</p>;

  const chartData = useMemo(() => {
    return {
      labels: daily.time.map((d) =>
        new Date(d).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        })
      ),
      datasets: [
        {
          label: "Max Wind Speed (km/h)",
          data: daily.wind_speed_10m_max,
          borderColor: "rgb(34,197,94)",
          backgroundColor: "rgba(34,197,94,0.2)",
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
          yAxisID: "speed",
        },
        {
          label: "Wind Direction (°)",
          data: daily.wind_direction_10m_dominant,
          borderColor: "rgb(168,85,247)",
          backgroundColor: "rgba(168,85,247,0.2)",
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
          yAxisID: "direction",
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
        text: "Wind Speed & Dominant Direction",
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
      speed: {
        type: "linear",
        position: "left",
        title: { display: true, text: "Wind Speed (km/h)" },
      },
      direction: {
        type: "linear",
        position: "right",
        min: 0,
        max: 360,
        grid: { drawOnChartArea: false },
        title: { display: true, text: "Direction (°)" },
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

export default memo(WindGraph)