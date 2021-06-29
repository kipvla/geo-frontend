import React from 'react';
import { Link } from 'gatsby';
import Globe from 'react-globe.gl';

import Navbar from '../components/presentational/Navbar';

const isBrowser = typeof window !== 'undefined';

export default function index() {
  return (
    <div>
      <Navbar />
      <h1>Hello world! 🌍</h1>
      <Link to="/game">Start game</Link>
      {isBrowser ? <Globe backgroundColor="white" globeImageUrl="/images/earthlights4k.jpg" showGraticules /> : null}
    </div>
  );
}
