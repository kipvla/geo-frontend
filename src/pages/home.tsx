import React from 'react';
import { Link } from 'gatsby';
import Navbar from '../components/presentational/Navbar';

const Home: React.FC = () => (
  <div className="page__container">
    <Navbar auth />
    <Link to="/game" className="button__primary">
      start game
    </Link>
  </div>
);

export default Home;
