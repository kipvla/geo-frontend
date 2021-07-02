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
      {user.pendingRequests.length ? (
        <>
          {user.pendingRequests.map((pendingRequest: FriendDetails) => (
            <div key={pendingRequest.id} style={{}}>
              <p>{pendingRequest.username}</p>
            </div>
          ))}
        </>
      ) : (
        <div>No Pending requests</div>
      )}
    </div>
  );
};
export default PendingRequests;
