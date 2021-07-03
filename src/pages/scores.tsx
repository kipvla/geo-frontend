import React from 'react';
import { Link } from 'gatsby';
import Logout from '../components/auth/logout';
import MultiPlayerScores from '../components/social/MultiPlayerScores';

const Scores: React.FC = () => (
  <div className="links">
    <div
      style={{
        justifyContent: 'space-between',
        display: 'flex',
        padding: '1rem',
      }}
    >
      <div>
        <Link to="/social" className="navbar__link">
          Back
        </Link>
      </div>
      <Logout />
    </div>

    {/* Multiplayer scores go here */}
    <MultiPlayerScores />
    {/* Probably store the game in the context wihile switching pages */}
  </div>
);

export default Scores;
