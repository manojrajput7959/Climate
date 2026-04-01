import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";

import Current from "./Pages/Current";
const Historical = lazy(() => import("./Pages/Historical"));

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Current />} />
        <Route
          path="/historical"
          element={
            <Suspense fallback={<div className="text-white p-5">Loading historical data...</div>}>
              <Historical />
            </Suspense>}/>
      </Routes>
    </div>
  );
};

export default App;