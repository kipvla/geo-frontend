import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import Select from 'react-select';
import { useUserContext } from '../../lib/context/userContext';
import { useGameContext } from '../../lib/context/gameContext';
import apiService from '../../services/apiService';

const InitMultiplayer: React.FC = () => {
  const { user } = useUserContext();
  const { game, populateMultiplayerScoreId } = useGameContext();
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState({
    value: '',
    label: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const options = user.friendsList.map((friend) => ({
      value: friend.id,
      label: friend.username,
    }));
    setFriends(options);
  }, [user]);

  const handleSelect = (selected) => {
    setSelectedFriend(selected);
    setSuccessMessage('');
  };
  const sendInvite = async () => {
    // TODO this is only for testing
    populateMultiplayerScoreId(game.multiplayerGameID);
    try {
      const response = await apiService.sendGameInvite(
        game.multiplayerGameID,
        selectedFriend.value
      );
      if (response.ok) {
        setSuccessMessage('Game invite sent!');
      } else {
        const body = await response.json();
        setError(body.msg);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="modal__focus">
      <Select options={friends} onChange={handleSelect} />
      <button
        type="button"
        className="button__primary"
        onClick={sendInvite}
        disabled={!selectedFriend.value}
      >
        send invitation
      </button>

      {error && <p>{error}</p>}
      {successMessage && (
        <>
          <p>{successMessage}</p>
          <Link to="/game" className="link__button">
            proceed to game
          </Link>
        </>
      )}
    </div>
  );
};

export default InitMultiplayer;
