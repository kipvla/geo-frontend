import React, { ReactElement } from 'react';
import { Link } from 'gatsby';
import Logout from '../auth/logout';

export interface NavbarProps {
  auth: boolean
}

// eslint-disable-next-line max-len
const Navbar: React.FC<NavbarProps> = ({ auth }: NavbarProps): ReactElement => (
  <div className="navbar">
    <a href="/">nomad</a>
    <div className="links">
      {
        auth
          ? <Logout />
          : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )
      }
    </div>
  </div>
);

export default Navbar;
