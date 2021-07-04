import React from 'react';
import { Link } from 'gatsby';
import { FaUserFriends } from 'react-icons/fa';
import { AiOutlineTrophy } from 'react-icons/ai';
import Logout from '../auth/logout';

export interface NavbarProps {
  auth: boolean;
}

// eslint-disable-next-line max-len
const Navbar: React.FC<NavbarProps> = ({ auth }: NavbarProps) => (
  <div className="navbar">
    {auth ? (
      <>
        <Link to="/home" className="navbar__link">
          nomad
        </Link>
        <div className="links">
          <Link to="/gameRequests" className="navbar__link">
            Game Requests
          </Link>
          <Link to="/social" className="navbar__link">
            <FaUserFriends className="navbar__icon" />
          </Link>
          <Link to="/leaderboards" className="navbar__link">
            <AiOutlineTrophy className="navbar__icon" />
          </Link>
          <Logout />
        </div>
      </>
    ) : (
      <>
        <Link to="/" className="navbar__link">
          nomad
        </Link>
        <div className="links">
          <Link to="/login" className="navbar__link">
            Login
          </Link>
          <Link to="/register" className="navbar__link">
            Register
          </Link>
        </div>
      </>
    )}
  </div>
);

export default Navbar;
