/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

interface UserContextInterface {
  isAuthenticated: boolean;
  setAuthenticated: (bool: boolean) => void;
}

export const UserContext = React.createContext<UserContextInterface>(null);

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }): any => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <UserContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);
