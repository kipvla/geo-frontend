import React, { useState } from 'react';
import Navbar from '../components/presentational/Navbar';

const Globe = React.lazy(() => import('react-globe.gl'));
const isBrowser = () => typeof window !== 'undefined';

const Index = () => {
  const [isGlobeShowing, setIsGlobeShowing] = useState(true);
  const handleGlobeClick = ({ lat, lng }, event) => {
    console.log(event, lat, lng);
    setIsGlobeShowing(!isGlobeShowing);
  };

  return (
    <div>
      <Navbar auth={false} />

      {isBrowser() ? (
        <React.Suspense
          fallback={
            <div className="page__container container spinner">...</div>
          }
        >
          <Globe
            showGlobe={isGlobeShowing}
            backgroundColor="#fbf3ea"
            globeImageUrl="/images/earthlights4k.jpg"
            showGraticules
            onGlobeClick={handleGlobeClick}
          />
        </React.Suspense>
      ) : null}
    </div>
  );
};

export default Index;
