import React, { useState } from 'react';
import Navbar from '../components/presentational/Navbar';

const Globe = React.lazy(() => import('react-globe.gl'));
// const N = 20;
// const arcsData = [...Array(N).keys()].map(() => ({
//   startLat: (Math.random() - 0.5) * 180,
//   startLng: (Math.random() - 0.5) * 360,
//   endLat: (Math.random() - 0.5) * 180,
//   endLng: (Math.random() - 0.5) * 360,
//   color: [['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
//   ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]],
// }));
const isBrowser = () => typeof window !== 'undefined';
export default function index() {
  const [isGlobeShowing, setIsGlobeShowing] = useState(false);
  const handleGlobeClick = ({ lat, lng }, event) => {
    console.log(event, lat, lng);
    setIsGlobeShowing(!isGlobeShowing);
  };
  return (
    <div>
      <Navbar />
      {isBrowser() ? (
        <React.Suspense fallback={<div />}>
          <Globe
            showGlobe={isGlobeShowing}
            backgroundColor="black"
            globeImageUrl="/images/earthlights4k.jpg"
            showGraticules
            onGlobeClick={handleGlobeClick}
            // arcsData={arcsData}
            arcColor="color"
            arcDashLength={() => Math.random()}
            arcDashGap={() => Math.random()}
            arcDashAnimateTime={() => Math.random() * 4000 + 500}
          />
        </React.Suspense>
      ) : null}
    </div>
  );
}
