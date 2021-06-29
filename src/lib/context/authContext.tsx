/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

interface AuthContextInterface {
  isAuthenticated: boolean;
  setAuthenticated: (bool: boolean) => void;
}

export const AuthContext = React.createContext<AuthContextInterface>(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }): any => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
