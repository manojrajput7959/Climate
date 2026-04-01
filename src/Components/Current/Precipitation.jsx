import React, { useContext } from 'react'
import Rain from '../../assets/rain.png'
import { StoreContext } from '../Context'

const Precipitation = () => {
    const { weather } = useContext(StoreContext)

    if (!weather?.current) return null

    const precipitation = weather.current.precipitation

    return (
        <div className="w-full md:w-[18vw] h-[23vh] mt-5 lg:my-auto md:h-[23vh] px-4 py-3 border border-zinc-600 rounded-2xl text-white shadow-xl flex flex-col md:items-start">

            {/* Title */}
            <div className="font-medium text-zinc-200 md:text-left">
                Precipitation
            </div>

            {/* Precipitation Value */}
            <div className="mt-2 text-3xl md:text-3xl md:text-left">
                {precipitation} mm
            </div>

            {/* Image */}
            <div className="flex justify-center md:justify-end w-full -mt-4 md:-mt-6">
                <img
                    src={Rain}
                    alt="Precipitation"
                    className="w-23 h-20 md:w-16 md:h-16 object-contain"
                />
            </div>

        </div>
    )
}

export default Precipitation