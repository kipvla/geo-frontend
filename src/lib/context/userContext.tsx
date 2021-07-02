/* eslint-disable no-unused-vars */
import { AnyPointerEvent } from 'framer-motion/types/gestures/PanSession';
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
  _id: '',
  createdAt: '',
  updatedAt: '',
};

export const UserContext =
  React.createContext<UserContextInterface>(defaultValue);

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }): any => {
  const [user, setUser] = useState<User>(initialUserState);

  const populateUser = (userData: User) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, populateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);
