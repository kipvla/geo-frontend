import React from 'react';
import { Link } from 'gatsby';
import { useAuthContext } from '../../lib/context/authContext';

const Logout: React.FC = () => {
  const { setAuthenticated } = useAuthContext();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setAuthenticated(false);
  };

  return (
    <Link to="/" onClick={handleLogout}>
      Logout
    </Link>
  );
};

export default Logout;
