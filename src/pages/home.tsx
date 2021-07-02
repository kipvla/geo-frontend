import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import Modal from '../components/presentational/Modal';
import Navbar from '../components/presentational/Navbar';
import apiService from '../services/apiService';
import backgroundMap from '../images/globe.png';

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

      <img src={backgroundMap} width="60%" alt="hand drawn world" />

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

      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <p>i will be the multi player modal</p>
      </Modal>
    </div>
  );
};

export default Home;
