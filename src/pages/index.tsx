import React from 'react';
import { Link } from 'gatsby';
import MapSelector from '../components/MapSelector';

export default function index() {
  return (
    <div>
      <h1>Hello world! 🌍</h1>
      <Link to="/game">To game</Link>
      <MapSelector />
    </div>
  );
}
