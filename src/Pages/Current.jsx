import React, { useContext, Suspense, lazy } from 'react';
import Header from '../Components/Current/Header';
import Hero from '../Components/Current/Hero';
import { StoreContext } from '../Components/Context';

// Lazy-load HeroGraph
const HeroGraph = lazy(() => import('../Components/HeroGraph/HeroGraph'));

const Current = () => {
  const { weather,airQuality } = useContext(StoreContext);

  if (!weather) {
    return <span className='text-white'>Loading...</span>;
  }

console.log("star")

  return (
    <div className='min-h-full'>
      <Header />
      <Hero />

      {/* Suspense wraps the lazy component */}
      <Suspense fallback={<div className="text-white p-5">Loading graphs...</div>}>
        <HeroGraph weather={weather} airQuality={airQuality} />
      </Suspense>
    </div>
  );
};

export default Current;