import React from 'react';
import { Link } from 'gatsby';
import Logout from '../auth/logout';

export interface NavbarProps {
  auth: boolean;
}

// eslint-disable-next-line max-len
const Navbar: React.FC<NavbarProps> = ({ auth }: NavbarProps) => (
  <div className="navbar">
    <Link to="/" className="navbar__link">
      nomad
    </Link>
    <div className="links">
      {auth ? (
        <>
          <Link to="/gameRequests" className="navbar__link">
            Game Requests
          </Link>
          <Link to="/social" className="navbar__link">
            Social
          </Link>
          <Link to="/leaderboards" className="navbar__link">
            Leaderboard
          </Link>
          <Logout />
        </>
      ) : (
        <>
          <Link to="/login" className="navbar__link">
            Login
          </Link>
          <Link to="/register" className="navbar__link">
            Register
          </Link>
        </>
      )}
    </div>
  </div>
);

export default Navbar;
