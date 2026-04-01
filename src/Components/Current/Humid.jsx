import React, { useContext } from 'react'
import humidity from "../../assets/humidity.png"
import { StoreContext } from '../Context'

const Humid = () => {
    const { weather } = useContext(StoreContext)

    if (!weather?.current) return null

    const humidityValue = weather.current.relative_humidity_2m

    return (
        <div className="w-full md:w-[18vw] h-[23vh] mt-5 lg:my-auto md:h-[23vh] px-4 py-3 border border-zinc-600 rounded-2xl text-white shadow-xl flex flex-col md:items-start">

            {/* Title */}
            <div className="font-medium text-zinc-200 md:text-left">
                Humidity
            </div>

            {/* Humidity Value */}
            <div className="mt-2 text-3xl md:text-3xl md:text-left">
                {humidityValue}%
            </div>

            {/* Image */}
            <div className="flex justify-center md:justify-end w-full -mt-4 md:-mt-6">
                <img
                    src={humidity}
                    alt="Humidity"
                    className="w-18 h-15 md:w-16 md:h-16 object-contain"
                />
            </div>

        </div>
    )
}

export default Humid