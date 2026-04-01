import React, { useContext } from 'react'
import sun from "../../assets/sun.png"
import { StoreContext } from '../Context'

const UVIndex = () => {
  const { weather } = useContext(StoreContext)
  if (!weather?.current) return null

  const temp = weather.current.uv_index

  const handleLevel = (temp) => {
    if (temp <= 2) return "Low"
    else if (temp <= 5) return "Moderate"
    else if (temp <= 7) return "High"
    else if (temp <= 10) return "VeryHigh"
    else return "Extreme"
  }

  const Level = handleLevel(temp)

  return (
    <div className="w-full md:w-[18vw] h-[23vh] mt-5 lg:my-auto md:h-[23vh] px-4 py-3 border border-zinc-600 rounded-2xl text-white shadow-xl flex flex-col md:items-start">

      {/* Title */}
      <div className="font-medium text-zinc-200  md:text-left">
        UV Index
      </div>

      {/* UV Value */}
      <div className="mt-2 text-3xl md:text-3xl md:text-left">
        {temp} <span className='text-xl md:text-xl'>({Level})</span>
      </div>

      {/* Image */}
      <div className="flex justify-center md:justify-end w-full md:-mt-2">
        <img
          src={sun}
          alt="UV Index"
          className="w-40 h-18 md:w-16 md:h-16 object-contain"
        />
      </div>
    </div>
  )
}

export default UVIndex