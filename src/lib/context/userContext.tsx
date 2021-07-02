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
  username: '',
  friendsList: [],
  friendRequests: [],
  pendingRequests: [],
  gameInvites: [],
  highestScore: 0,
  currentLevel: 1,
  exp: 0,
  createdAt: '',
  updatedAt: '',
  _id: '',
};

export const UserContext =
  React.createContext<UserContextInterface>(defaultValue);

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }): any => {
  const [user, setUser] = useState<User>(initialUserState);

  const populateUser = (userData: any) => {
    setUser(userData.user);
    console.log(userData.user);
  };
  return (
    <UserContext.Provider value={{ user, populateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);
