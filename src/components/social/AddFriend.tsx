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
      <form className="container" onSubmit={handleAddFriend}>
        <p>Add a friend with their username </p>
        <input
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <button type="submit" disabled={!username} className="button__primary">
          Send Friend Request
        </button>
      </form>
      {error ? <p>{error}</p> : null}
      {successMessage ? <p>{successMessage}</p> : null}
    </div>
  );
};
export default AddFriend;
