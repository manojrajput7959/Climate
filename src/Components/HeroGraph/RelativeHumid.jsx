import React, { useMemo, memo } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import { Chart } from "chart.js";

Chart.register(zoomPlugin);

const RelativeHumid = ({ weather }) => {
    const hourly = weather?.hourly;
    if (!hourly) return null;

    const chartData = useMemo(() => ({
        labels: hourly.time.map(t => t.split("T")[1]),
        datasets: [
            {
                label: "Relative Humidity (%)",
                data: hourly.relative_humidity_2m,
                borderColor: "rgb(59,130,246)",
                backgroundColor: "rgba(59,130,246,0.15)",
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
                text: "Relative Humidity",
                color: "#fff",
                align: "start",
                font: { size: 26, weight: "bold" }
            },
            legend: { display: false },
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
            y: { beginAtZero: true, max: 100 }
        }
    };

    return (
        <div className="w-full md:w-[45vw] rounded-md scrollbar-custom h-[40vh] md:h-[45vh] overflow-x-auto border-2 border-zinc-600">
            <div className="w-[90rem] md:w-[125rem] px-3 h-full">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default memo(RelativeHumid);