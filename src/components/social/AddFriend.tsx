import React, { useState } from 'react';
import apiService from '../../services/apiService';
import { useUserContext } from '../../lib/context/userContext';

const AddFriend: React.FC = () => {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [username, setUsername] = useState('');
  const { populateUser } = useUserContext();

  const handleAddFriend = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.sendFriendRequest(username);
      if (response.ok) {
        setSuccessMessage('Friend request sent!!');
        const body = await response.json();
        populateUser(body.user);
        setError('');
        setUsername('');
      } else {
        const body = await response.json();
        setSuccessMessage('');
        setError(body.msg);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="addFriend__container">
      <div className="addFriend__text">Add a friend with their username </div>
      <form style={{ display: 'flex' }} onSubmit={handleAddFriend}>
        <input
          name="username"
          type="text"
          value={username}
          style={{ marginBottom: '0px', marginRight: '20px' }}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <button
          style={{ width: '180px', height: '30px' }}
          type="submit"
          disabled={!username}
          className="button__primary"
        >
          Send Friend Request
        </button>
      </form>
      {error ? <p>{error}</p> : null}
      {successMessage ? <p>{successMessage}</p> : null}
    </div>
  );
};
export default AddFriend;
