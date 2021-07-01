import React from 'react';
import { Link } from 'gatsby';

const Logout: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
  };

  return (
    <Link to="/" onClick={handleLogout}>
      log out
    </Link>
  );
};

export default Logout;
