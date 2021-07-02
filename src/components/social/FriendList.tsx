import React from 'react';
import { useUserContext } from '../../lib/context/userContext';
// import apiService from '../../services/apiService';

const FriendList: React.FC = () => {
  const { user } = useUserContext();
  return (
    <>
      {user.friendsList.map((friend) => (
        <p>{friend.username}</p>
      ))}
    </>
  );
};
export default FriendList;
