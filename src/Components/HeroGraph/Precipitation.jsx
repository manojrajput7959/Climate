import React, { useMemo, memo } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import { Chart } from "chart.js";

Chart.register(zoomPlugin);

const Precipitation = ({ weather }) => {
    const hourly = weather?.hourly;
    if (!hourly) return null;

    const chartData = useMemo(() => ({
        labels: hourly.time.map(t => t.split("T")[1]),
        datasets: [
            {
                label: "Precipitation (mm)",
                data: hourly.precipitation,
                backgroundColor: "rgba(59,130,246,0.4)",
                borderColor: "rgb(30,64,175)",
                borderWidth: 1,
                borderRadius: 4
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
                text: "Precipitation",
                color: "#fff",
                align: "start",
                font: { size: 26, weight: "bold" }
            },
            legend: { display: false },
            tooltip: {
                mode: "index",
                intersect: false,
                backgroundColor: "rgba(0,0,0,0.85)"
            },
            zoom: {
                pan: { enabled: true, mode: "x" },
                zoom: { wheel: { enabled: true }, pinch: { enabled: true }, drag: { enabled: true }, mode: "x" }
            }
        },
        scales: {
            x: { ticks: { autoSkip: false, maxRotation: 30 } },
            y: { beginAtZero: true }
        }
    };

    return (
        <div className="w-full md:w-[50vw] rounded-md scrollbar-custom h-[40vh] md:h-[45vh] overflow-x-auto border-2 border-zinc-600">
            <div className="w-[90rem] md:w-[125rem] px-4 h-full">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default memo(Precipitation);