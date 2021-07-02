import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import Modal from '../components/presentational/Modal';
import Navbar from '../components/presentational/Navbar';
import AddFriends from '../components/friends/AddFriends';
import apiService from '../services/apiService';

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await apiService.fetchUser().then((res) => res.json());
      console.log(user);
    };
    fetchUser();
  }, []);

  return (
    <div className="container page__container">
      <Navbar auth />
      {/* add friends */}
      {/* friends bar on the side */}

      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="button__primary"
      >
        Add Friends!!!
      </button>

      <Link to="/game" className="button__primary">
        start game
      </Link>

      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <AddFriends showModal={showModal} />
      </Modal>
    </div>
  );
};

export default Home;
