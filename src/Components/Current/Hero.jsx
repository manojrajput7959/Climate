import React, { memo } from 'react'
import Temp from './Temp'
import Humid from './Humid'
import UVIndex from './UVIndex'
import WindSpeed from './WindSpeed'
import Precipitation from './Precipitation'
import AirQuality from './AirQuality'
import Sunrise from './Sunrise'

const Hero = () => {
  return (
    <div className='px-6 flex justify-between flex-wrap mt-10'>
      <Temp />
      <Humid />
      <UVIndex />
      <WindSpeed />
      <Precipitation />
      <AirQuality />
      <Sunrise/>
    </div>
  )
}

export default memo(Hero)