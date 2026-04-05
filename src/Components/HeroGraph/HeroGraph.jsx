import React, { memo } from 'react'
import TempGraph from './TempGraph'
import RelativeHumid from './RelativeHumid'
import Precipitation from './Precipitation'
import Visibility from './Visibility'
import WindSpeed from './WindSpeed'
import PM10And25 from './PM10And25'

const HeroGraph = ({ weather, airQuality }) => {
    return (
        <div className="my-10 px-5 flex flex-col gap-10 md:gap-0">

            {/* Row 1 */}
            <div className="flex flex-col md:flex-row md:justify-between gap-5 md:gap-0">
                <TempGraph weather={weather} />
                <RelativeHumid weather={weather} />
            </div>

            {/* Row 2 */}
            <div className="flex flex-col md:flex-row lg:mt-10 mt-auto md:justify-between gap-5 md:gap-0">
                <Precipitation weather={weather} />
                <Visibility weather={weather} />
            </div>

            {/* Row 3 */}
            <div className="flex flex-col md:flex-row mt-auto md:mt-10 md:justify-between gap-5 md:gap-0">
                <WindSpeed weather={weather} />
                <PM10And25 airQuality={airQuality} />
            </div>

        </div>
    )
}

export default memo(HeroGraph)