import React from 'react';
import { FriendDetails } from '../../interfaces';
import { useUserContext } from '../../lib/context/userContext';

const PendingRequests: React.FC = () => {
  const { user } = useUserContext();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        {user && user.friendRequests.length ? (
          <>
            {user.friendRequests.map((friendRequest: FriendDetails) => (
              <div
                key={friendRequest.id}
                style={{ width: '50vw', border: '1px solid black' }}
              >
                <p>{friendRequest.username}</p>
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
