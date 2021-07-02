/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { User } from '../../interfaces';

interface UserContextInterface {
  user: User;
  populateUser: (userData: any) => void;
}

const defaultValue = {
  user: null,
  populateUser: () => {},
};

export const UserContext =
  React.createContext<UserContextInterface>(defaultValue);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const populateUser = (userData: any) => {};

  return (
    <UserContext.Provider value={{ user, populateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);
