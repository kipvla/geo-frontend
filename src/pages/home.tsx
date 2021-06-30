import React from 'react';
import { Link } from 'gatsby';
import Navbar from '../components/presentational/Navbar';

const Home: React.FC = () => (
  <div>
    <Navbar auth />
    <Link to="/game">start game</Link>
  </div>
);

export default Home;
