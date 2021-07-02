/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { User } from '../../interfaces';

interface UserContextInterface {
  user: User;
  populateUserData: (userData: User) => void;
}

const defaultValue = {
  user: null,
  populateUserData: () => {},
};

const initialUserState: User = {
  friendsList: [],
  friendRequests: [],
  pendingRequests: [],
  exp: 0,
  currentLevel: 1,
  highestScore: 0,
  gameInvites: [],
  _id: '',
  username: '',
  email: '',
  createdAt: '',
  updatedAt: '',
};

export const UserContext =
  React.createContext<UserContextInterface>(defaultValue);

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }): any => {
  const [user, setUser] = useState<User>(initialUserState);

  const populateUserData = (userData: User) => {
    console.log(userData, ' in cont');
    setUser(userData);
    console.log(user, ' in cont');
  };

  return (
    <UserContext.Provider value={{ user, populateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);
