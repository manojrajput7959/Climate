import React, { useContext } from 'react';
import { StoreContext } from '../Context';

const AirQuality = () => {
    const { airQuality } = useContext(StoreContext);

    if (!airQuality?.hourly) return null;

    const hourly = airQuality.hourly;
    const currentHour = new Date().getHours();

    const pm10 = hourly.pm10?.[currentHour];
    const pm25 = hourly.pm2_5?.[currentHour];
    const co = hourly.carbon_monoxide?.[currentHour];
    const co2 = hourly.carbon_dioxide?.[currentHour];
    const no2 = hourly.nitrogen_dioxide?.[currentHour];
    const so2 = hourly.sulphur_dioxide?.[currentHour];

    const calculateAQI = (pm25, pm10) => {
        if (!pm25 || !pm10) return "--";
        const aqiPM25 = pm25 * 4;
        const aqiPM10 = pm10 * 2;
        return Math.round(Math.max(aqiPM25, aqiPM10));
    };

    const aqi = calculateAQI(pm25, pm10);

    return (
        <div className="w-full md:w-[26vw] h-auto md:h-[25vh] px-4 md:px-6 py-4 mt-6 border border-zinc-700 rounded-2xl text-white shadow-xl">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h1 className="text-base md:text-lg font-medium text-zinc-200 mb-2 md:mb-0">Air Quality</h1>
                <span className="text-2xl md:text-3xl font-semibold">
                    AQI <span className="text-base md:text-xl font-normal">{aqi}</span>
                </span>
            </div>

            {/* Pollutants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 md:gap-x-6 text-sm md:text-sm">
                <div className="flex justify-between">
                    <span>PM10</span>
                    <span>{pm10 ?? "--"} µg/m³</span>
                </div>
                <div className="flex justify-between">
                    <span>PM2.5</span>
                    <span>{pm25 ?? "--"} µg/m³</span>
                </div>

                <div className="flex justify-between">
                    <span>CO</span>
                    <span>{co ?? "--"} mg/m³</span>
                </div>
                <div className="flex justify-between">
                    <span>CO<sub>2</sub></span>
                    <span>{co2 ?? "--"} ppm</span>
                </div>

                <div className="flex justify-between">  
                    <span>NO<sub>2</sub></span>
                    <span>{no2 ?? "--"} µg/m³</span>
                </div>
                <div className="flex justify-between">
                    <span>SO<sub>2</sub></span>
                    <span>{so2 ?? "--"} µg/m³</span>
                </div>
            </div>
        </div>
    );
};

export default AirQuality;