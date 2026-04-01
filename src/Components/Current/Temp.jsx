import React, { useContext, memo } from "react";
import { StoreContext } from "../Context";

import cloudy from '../../assets/Cloudy.png'
import sun from "../../assets/sun.png"
import normal from "../../assets/normal.png"
import Cold from '../../assets/Cold.png'

const getImageVal = (temp) => {
    if (temp <= 10) return Cold
    if (temp <= 20) return cloudy
    if (temp <= 30) return sun
    return normal
}

const Temp = () => {
    const { celsius, weather } = useContext(StoreContext)

    if (!weather?.current || !weather?.daily) return null

    const temp = weather.current.temperature_2m
    const min = weather.daily.temperature_2m_min[0]
    const max = weather.daily.temperature_2m_max[0]

    return (
        <div className="w-full md:w-[18vw] h-[23vh] md:h-[23vh] px-4 py-3 border border-zinc-600 rounded-2xl text-white shadow-xl flex flex-col items-start md:items-start">

            {/* Title */}
            <div className="text-lg md:text-sm font-medium text-zinc-200">
                Current Temperature
            </div>

            {/* Temperature */}
            <div className="mt-2 text-3xl md:text-4xl flex items-baseline">
                {temp} <span className="text-xl md:text-2xl">°</span>
                <span className="text-lg md:text-xl">{celsius}</span>
            </div>

            {/* Image */}
            <div className="flex justify-center md:justify-end w-full -mt-4 md:-mt-6">
                <img
                    src={getImageVal(temp)}
                    alt="Temperature"
                    className="w-18 h-15 md:w-13 md:h-12 object-contain"
                />
            </div>

            {/* Min / Max */}
            <div className="text-sm md:text-base mt-2 w-full text-center md:text-left">
                Min {min} °{celsius} / Max {max} °{celsius}
            </div>
        </div>
    );
};

export default memo(Temp);