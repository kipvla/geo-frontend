import React from 'react';
import { FriendDetails } from '../../interfaces';
import useFetchUser from '../../lib/hooks/useFetchUser';

const FriendList: React.FC = () => {
  const user = useFetchUser();

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
      {user && user.friendsList.length ? (
        <div>
          {user.friendsList.map((friend: FriendDetails) => (
            <div key={friend.id} style={{}}>
              <p>{friend.username}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No friends yet</div>
      )}
    </div>
  );
};
export default FriendList;
