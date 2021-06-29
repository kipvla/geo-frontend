import React, { FunctionComponent, ReactElement } from 'react';
import { Link } from 'gatsby';

export interface NavbarProps {
}

// eslint-disable-next-line max-len
const Navbar: FunctionComponent<NavbarProps> = (): ReactElement => (
  <div className="navbar">
    <a href="/">nomad</a>
    <div className="links">
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  </div>
);

export default Navbar;
