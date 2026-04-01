import React, { useContext } from 'react'
import { StoreContext } from '../Context'
import clouds from "../../assets/clouds.png"

const Sunrise = () => {
    const { weather } = useContext(StoreContext)

    if (!weather?.daily) return null

    const sunriseTime = weather.daily.sunrise[0] // e.g. "2026-04-01T06:10:00"
    const sunrise = sunriseTime.split("T")[1].slice(0, 5)
    
    const sunsetTime = weather.daily.sunset[0] // e.g. "2026-04-01T06:10:00"
    const sunset = sunsetTime.split("T")[1].slice(0, 5)

    return (
        <div className="w-full md:w-[18vw] h-auto md:h-[24vh] px-4 mt-6 py-3 border border-zinc-600 rounded-2xl text-white shadow-xl flex flex-col justify-between">

            {/* Sunrise */}
            <div className="font-medium text-zinc-200 flex md:justify-start gap-2 text-lg md:text-base">
                <span className='font-semibold'>Sunrise:</span>
                <span>{sunrise}</span>
            </div>

            {/* Clouds Image */}
            <div className="flex justify-center my-2">
                <img
                    src={clouds}
                    alt="Sun Clouds"
                    className="w-30 h-20 md:w-[13vw] md:h-[6vw] object-contain"
                />
            </div>

            {/* Sunset */}
            <div className="font-medium text-zinc-200 flex md:justify-end gap-2 text-lg md:text-base">
                <span className='font-semibold'>Sunset:</span>
                <span>{sunset}</span>
            </div>

        </div>
    )
}

export default Sunrise