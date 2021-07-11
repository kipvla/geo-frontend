import React, { useRef } from 'react';
import { Link } from 'gatsby';
import { FaUserFriends } from 'react-icons/fa';
import { AiOutlineTrophy, AiFillHome } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdAddAPhoto } from 'react-icons/md';
import { IoLogoGameControllerB } from 'react-icons/io';

import Logout from '../auth/logout';

export interface NavbarProps {
  auth: boolean;
  notifications?: number;
}

// eslint-disable-next-line max-len
const Navbar: React.FC<NavbarProps> = ({
  auth,
  notifications,
}: NavbarProps) => {
  const linksEl = useRef(null);

  const toggleLinks = () => {
    linksEl.current.style.display =
      linksEl.current.style.display === 'flex' ? 'none' : 'flex';
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
        <div className="links" ref={linksEl} onClick={toggleLinks}>
          <Link to="/home" className="navbar__link">
            <AiFillHome className="navbar__icon" title="home" />
          </Link>
          <Link to="/multiplayer" className="navbar__link">
            <IoLogoGameControllerB
              className="navbar__icon"
              title="multiplayer"
            />
            <IoLogoGameControllerB className="navbar__icon controller__diagonal" />
            {notifications ? (
              <div className="notification__flag">
                <b>{notifications}</b>
              </div>
            ) : null}
          </Link>
          <Link to="/crowdsource" className="navbar__link">
            <MdAddAPhoto className="navbar__icon" title="add photo" />
          </Link>
          <Link to="/social" className="navbar__link">
            <FaUserFriends className="navbar__icon" title="social" />
          </Link>
          <Link to="/leaderboards" className="navbar__link">
            <AiOutlineTrophy className="navbar__icon" title="leaderboard" />
          </Link>
          <Logout />
        </div>
      ) : (
        <div
          className="links links__unauth"
          ref={linksEl}
          onClick={toggleLinks}
        >
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
