import React from 'react';
import { Link } from 'gatsby';
import Navbar from '../components/presentational/Navbar';
import '../styles/index.css';

const Home: React.FC = () => (
  <div className="page__container container">
    <Navbar auth />
    <Link to="/game">start game</Link>
  </div>
);

export default Home;
