/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { User } from '../../interfaces';

interface UserContextInterface {
  user: User;
  populateUser: (userData: User) => void;
}

const defaultValue = {
  user: null,
  populateUser: () => {},
};

const initialUserState: User = {
  friendsList: [],
  friendRequests: [],
  pendingRequests: [],
  exp: 0,
  currentLevel: 1,
  highestScore: 0,
  gameInvites: [],
  username: '',
};

export const UserContext =
  React.createContext<UserContextInterface>(defaultValue);

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }): any => {
  const [user, setUser] = useState<User>(initialUserState);

  const populateUser = (userData: User) => {
    console.log(userData, ' in cont');
    setUser(userData);
    console.log(user, ' in cont');
  };

  return (
    <UserContext.Provider value={{ user, populateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);
