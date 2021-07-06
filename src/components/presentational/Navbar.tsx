import React from 'react';
import { Link } from 'gatsby';
import { FaUserFriends } from 'react-icons/fa';
import { AiOutlineTrophy, AiFillHome } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdAddAPhoto } from 'react-icons/md';

import { IoLogoGameControllerB } from 'react-icons/io';
import Logout from '../auth/logout';

export interface NavbarProps {
  auth: boolean;
}

// eslint-disable-next-line max-len
const Navbar: React.FC<NavbarProps> = ({ auth }: NavbarProps) => {
  const toggleLinks = () => {
    const links = document.querySelector('.links');
    links.style.display = links.style.display ? '' : 'flex';
  };

  return (
    <div className="navbar">
      <Link to={auth ? '/home' : '/login'} className="navbar__link">
        nomad
      </Link>
      <button type="button" className="hamburger" onClick={toggleLinks}>
        <GiHamburgerMenu />
      </button>
      {auth ? (
        <div className="links" onClick={toggleLinks}>
          <Link to="/home" className="navbar__link">
            <AiFillHome className="navbar__icon" />
          </Link>
          <Link to="/gameRequests" className="navbar__link">
            <IoLogoGameControllerB className="navbar__icon" />
            <IoLogoGameControllerB className="navbar__icon controller__diagonal" />
          </Link>
          <Link to="/crowdsource" className="navbar__link">
            <MdAddAPhoto className="navbar__icon" />
          </Link>
          <Link to="/social" className="navbar__link">
            <FaUserFriends className="navbar__icon" />
          </Link>
          <Link to="/leaderboards" className="navbar__link">
            <AiOutlineTrophy className="navbar__icon" />
          </Link>
          <Logout />
        </div>
      ) : (
        <div className="links">
          <Link to="/login" className="navbar__link">
            Login
          </Link>
          <Link to="/register" className="navbar__link">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
