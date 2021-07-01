import React from 'react';
import { Link } from 'gatsby';
import Logout from '../auth/logout';

export interface NavbarProps {
  auth: boolean;
}

// eslint-disable-next-line max-len
const Navbar: React.FC<NavbarProps> = ({ auth }: NavbarProps) => (
  <div className="navbar">
    <Link to="/">nomad</Link>
    <div className="links">
      {auth ? (
        <>
          <Link to="/leaderboards">Leaderboard</Link>
          <Logout />
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  </div>
);

export default Navbar;
