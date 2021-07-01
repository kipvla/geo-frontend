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
        <Logout />
      ) : (
        <>
          <Link to="/login">login</Link>
          <Link to="/register">register</Link>
        </>
      )}
    </div>
  </div>
);

export default Navbar;
