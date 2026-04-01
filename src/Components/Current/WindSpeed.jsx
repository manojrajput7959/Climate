import React, { useContext } from 'react'
import Wind from "../../assets/wind.png"
import { StoreContext } from '../Context'

const WindSpeed = () => {
    const { weather } = useContext(StoreContext)

    if (!weather?.current) return null

    const windSpeed = weather.current.wind_speed_10m

    return (
        <div className="w-full md:w-[18vw] h-[23vh] mt-5 lg:my-auto md:h-[23vh] px-4 py-3 border border-zinc-600 rounded-2xl text-white shadow-xl flex flex-col md:items-start">

            {/* Title */}
            <div className="font-medium text-zinc-200 md:text-left">
                Wind Speed
            </div>

            {/* Wind Speed Value */}
            <div className="mt-2 text-3xl md:text-3xl md:text-left">
                {windSpeed} <span className="text-xl md:text-xl">km/h</span>
            </div>

            {/* Image */}
            <div className="flex justify-center md:justify-end w-full -mt-4 md:-mt-6">
                <img
                    src={Wind}
                    alt="Wind Speed"
                    className="w-20 h-18 md:w-16 md:h-16 object-contain"
                />
            </div>

        </div>
    )
}

export default WindSpeed