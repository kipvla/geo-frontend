import React, { useState } from 'react';

import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Navbar from '../components/presentational/Navbar';

const Globe = React.lazy(() => import('react-globe.gl'));
const isBrowser = () => typeof window !== 'undefined';
const handleClick = (e) => {
  const login = document.querySelector('.login');
  const register = document.querySelector('.register');
  if (e.target.name === 'login') {
    login.style.display = 'block';
    register.style.display = 'none';
  }
  if (e.target.name === 'register') {
    register.style.display = 'block';
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
        <div style={{ display: 'flex' }}>
          <button name="login" type="button" onClick={handleClick}>
            Login
          </button>
          <button name="register" type="button" onClick={handleClick}>
            Register
          </button>
        </div>
        <div className="login">
          <Login />
        </div>
        <div className="register">
          <Register />
        </div>
      </div>
    </div>
  );
};

export default Index;
