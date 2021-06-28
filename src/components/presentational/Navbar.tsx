import React, { FunctionComponent, ReactElement } from 'react';

export interface NavbarProps {
}

// eslint-disable-next-line max-len
const Navbar: FunctionComponent<NavbarProps> = (): ReactElement => (
  <div className="navbar">
    <a href="/">nomad</a>
    <div className="links">
      <a href="/login">Login</a>
      <a href="/login">Register</a>
    </div>
  </div>
);

export default Navbar;
