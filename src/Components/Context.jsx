import axios from "axios";
import React, { createContext, useEffect, useState, useMemo, useCallback } from "react";

export const StoreContext = createContext(null);

const Context = ({ children }) => {
  const [celsius, setCelsius] = useState("C");

  // Page 1: single-day data
  const [weather, setWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null);

  // Page 2: range data
  const [rangeWeather, setRangeWeather] = useState(null);
  const [rangeAirQuality, setRangeAirQuality] = useState(null);

  const [coords, setCoords] = useState(null);
  const [date, setDate] = useState(new Date());
  const [dateRange, setDateRange] = useState({ start: new Date(new Date().setDate(new Date().getDate() - 20)),
     end: new Date() });

  // Single day formatted
  const handleDate = useMemo(() => date.toISOString().split("T")[0], [date]);

  // Date range formatted
  const handleStartDate = useMemo(() => dateRange.start.toISOString().split("T")[0], [dateRange.start]);
  const handleEndDate = useMemo(() => dateRange.end.toISOString().split("T")[0], [dateRange.end]);

  // STEP 1 → Get GPS only once
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
      },
      (error) => console.error("Geolocation error:", error)
    );
  }, []);

  // STEP 2 → Fetch single-day weather + air quality
  useEffect(() => {
    if (!coords) return;

    const fetchData = async () => {
      try {
        const { lat, lon } = coords;

        const weatherURL = `https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,uv_index&hourly=temperature_2m,visibility,relative_humidity_2m,precipitation,wind_speed_10m,uv_index&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&start_date=${handleDate}&end_date=${handleDate}&timezone=auto`;

        const airURL = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,carbon_monoxide,carbon_dioxide,nitrogen_dioxide,sulphur_dioxide&start_date=${handleDate}&end_date=${handleDate}&timezone=auto`;

        const [weatherRes, airRes] = await Promise.all([axios.get(weatherURL), axios.get(airURL)]);

        setWeather(weatherRes.data);
        console.log(weatherRes.data)
        
        setAirQuality(airRes.data);
      } catch (error) {
        console.error("API fetch error (single-day):", error);
      } 
    };

    fetchData();
  }, [coords, handleDate]);

  // STEP 3 → Fetch range data for Page 2
  useEffect(() => {
    if (!coords) return;
    if (!dateRange.start || !dateRange.end) return;

    const fetchRangeData = async () => {
      try {
        const { lat, lon } = coords;

        const weatherURL = `https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,visibility,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant,uv_index_max&start_date=${handleStartDate}&end_date=${handleEndDate}&timezone=auto`

        const airURL = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,carbon_monoxide,carbon_dioxide,nitrogen_dioxide,sulphur_dioxide&start_date=${handleStartDate}&end_date=${handleEndDate}&timezone=auto`;

        const [weatherRes, airRes] = await Promise.all([axios.get(weatherURL), axios.get(airURL)]);

        setRangeWeather(weatherRes.data);
        setRangeAirQuality(airRes.data);
      } catch (error) {
        console.error("API fetch error (range):", error);
      } 
    };

    fetchRangeData();
  }, [coords, handleStartDate, handleEndDate]);

  const tempToggle = useCallback(() => setCelsius((prev) => (prev === "C" ? "F" : "C")), []);

  const contextValue = useMemo(() => ({
  celsius,
  tempToggle,
  weather,
  airQuality,
  rangeWeather,
  rangeAirQuality,
  date,
  setDate,
  handleDate,
  dateRange,
  setDateRange,
  handleStartDate,
  handleEndDate,
}), [celsius, weather, airQuality, rangeWeather, rangeAirQuality, date, dateRange, handleDate, handleStartDate, handleEndDate, tempToggle]);

  return <StoreContext.Provider value={contextValue}>
    {children}
  </StoreContext.Provider>;
};

export default Context;