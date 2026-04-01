import React, { memo } from "react";
import TemperatureGraph from "./TemperatureGraph";
import SunriseSunsetGraph from "./SunriseSunsetGraph";
import PrecipitationGraph from "./PrecipitationGraph";
import WindGraph from "./WindGraph";
import AirQualityGraph from "./AirQualityGraph";

const GraphContainer = ({ rangeWeather, rangeAirQuality }) => {
  return (
    <div className="my-10 px-5 flex flex-col gap-10">


      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        <TemperatureGraph rangeWeather={rangeWeather} />
        <SunriseSunsetGraph rangeWeather={rangeWeather} />
      </div>


      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        <PrecipitationGraph rangeWeather={rangeWeather} />
        <WindGraph rangeWeather={rangeWeather} />
      </div>

      <div>
        <AirQualityGraph rangeAirQuality={rangeAirQuality} />
      </div>
    </div>
  );
};

export default memo(GraphContainer);