import React, { useState } from 'react';

import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Navbar from '../components/presentational/Navbar';

const Globe = React.lazy(() => import('react-globe.gl'));
const isBrowser = () => typeof window !== 'undefined';
const login = document.querySelector('.login');
const register = document.querySelector('.register');
const handleClick = (e) => {
  if (e.target.name === 'login') {
    login.style.display = 'flex';
    register.style.display = 'none';
  }
  if (e.target.name === 'register') {
    register.style.display = 'flex';
    login.style.display = 'none';
  }
};

const Index = () => {
  const [isGlobeShowing, setIsGlobeShowing] = useState(true);
  const handleGlobeClick = ({ lat, lng }, event) => {
    console.log(event, lat, lng);
    setIsGlobeShowing(!isGlobeShowing);
  };

  return (
    <div>
      <Navbar auth={false} />

      {isBrowser() ? (
        <React.Suspense
          fallback={
            <div className="page__container container spinner">...</div>
          }
        >
          <Globe
            showGlobe={isGlobeShowing}
            backgroundColor="#fbf3ea"
            globeImageUrl="/images/earthlights4k.jpg"
            showGraticules
            onGlobeClick={handleGlobeClick}
          />
        </React.Suspense>
      ) : null}
      <div className="auth__parent__container">
        <div className="login container">
          <Login />
          <button
            name="register"
            className="button__register"
            type="button"
            onClick={handleClick}
          >
            Register
          </button>
        </div>
        <div className="register container">
          <Register />
          <button
            name="login"
            className="button__login"
            type="button"
            onClick={handleClick}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
