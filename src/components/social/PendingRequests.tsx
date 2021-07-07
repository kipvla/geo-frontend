import React from 'react';
import { HiUserAdd } from 'react-icons/hi';
import { GiCancel } from 'react-icons/gi';
import { FriendDetails } from '../../interfaces';
import { useUserContext } from '../../lib/context/userContext';
import apiService from '../../services/apiService';

const PendingRequests: React.FC = () => {
  const { user, populateUser } = useUserContext();
  const addFriend = async (friendRequest: FriendDetails) => {
    const { id, username } = friendRequest;
    try {
      const response = await apiService.acceptFriendRequest(id, username);
      const body = await response.json();
      populateUser(body.user);
    } catch (err) {
      console.log(err.message);
    }
  };
  const declineRequest = async (friendRequest: FriendDetails) => {
    const { id } = friendRequest;
    try {
      const response = await apiService.declineFriendRequest(id);
      const body = await response.json();
      populateUser(body.user);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="gameRequest__container container">
      <div>
        {user && user.friendRequests.length ? (
          <>
            {user.friendRequests.map((friendRequest: FriendDetails) => (
              <div key={friendRequest.id} className="gameRequest__block">
                <h2 style={{ marginLeft: '1rem' }}>{friendRequest.username}</h2>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="button__success"
                    onClick={() => addFriend(friendRequest)}
                  >
                    <HiUserAdd />
                  </button>
                  <button
                    type="button"
                    className="button__warning"
                    onClick={() => declineRequest(friendRequest)}
                  >
                    <GiCancel />
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>No friend requests</div>
        )}
      </div>
    </div>
  );
};
export default PendingRequests;
