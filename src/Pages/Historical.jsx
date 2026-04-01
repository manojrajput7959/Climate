import React, { memo, Suspense, useContext } from "react";
import { StoreContext } from "../Components/Context";
import DateManage from "../Components/Historical/DateManage";
let GraphContainer = React.lazy(() => import("../Components/Historical/GraphContainer"))

const Historical = () => {
  const { rangeWeather, rangeAirQuality} = useContext(StoreContext);

  return (
    <>
      <DateManage />
      {rangeWeather && (
        <Suspense fallback={<div className="text-white p-5">Loading graphs...</div>}>
          <GraphContainer
          rangeWeather={rangeWeather}
          rangeAirQuality={rangeAirQuality}
          />
        </Suspense>
      )}
    </>
  );
};

export default memo(Historical);