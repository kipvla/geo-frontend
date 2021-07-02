import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import Modal from '../components/presentational/Modal';
import Navbar from '../components/presentational/Navbar';
import apiService from '../services/apiService';
import { useUserContext } from '../lib/context/userContext';

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { populateUserData } = useUserContext();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await apiService.fetchUser().then((res) => res.json());
      populateUserData(userData.user);
    };
    fetchUser();
  }, []);

  return (
    <div className="container page__container">
      <Navbar auth />

      <Link to="/game" className="link__button">
        single player
      </Link>

      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="button__primary"
      >
        multi player
      </button>

      <Modal
        show={showModal}
        handleClose={() => setShowModal(false)}
      >
        <p>i will be the multi player modal</p>
      </Modal>
    </div>
  );
};

export default Home;
