import React, { useState } from 'react';
import apiService from '../../services/apiService';

// search bar to select friends
// send invitation button
// start game

const InitMultiplayer: React.FC = () => {
  // const [selected, setSelected] = useState();
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  // const [startGame, setStartGame] = useState(false);

  const sendInvite = async () => {
    try {
      const response = await apiService.sendGameInvite('an_id', 'username');
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
      <p>im a search bar</p>
      <button type="button" onClick={sendInvite}>
        send invitation
      </button>
      {error && <p>{error}</p>}
      {successMessage && (
        <>
          <p>{successMessage}</p>
          <button type="button">proceed to game</button>
        </>
      )}
    </div>
  );
};

export default InitMultiplayer;
