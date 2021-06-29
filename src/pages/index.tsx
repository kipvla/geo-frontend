import React from 'react';
import { Link } from 'gatsby';
import Navbar from '../components/presentational/Navbar';

const Globe = React.lazy(() => (
  import('react-globe.gl')
));

const isBrowser = () => typeof window !== 'undefined';

export default function index() {
  return (
    <div>
      <Navbar />
      <h1>Hello world! 🌍</h1>
      <Link to="/game">Start game</Link>
      {isBrowser()
        ? (
          <React.Suspense fallback={<div />}>
            <Globe backgroundColor="white" globeImageUrl="/images/earthlights4k.jpg" showGraticules />
          </React.Suspense>
        )
        : null }
    </div>
  );
}
