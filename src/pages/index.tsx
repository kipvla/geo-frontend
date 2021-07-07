import React, { useRef } from 'react';

import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Navbar from '../components/presentational/Navbar';
import Spinner from '../components/presentational/Spinner';

const Globe = React.lazy(() => import('react-globe.gl'));
const isBrowser = () => typeof window !== 'undefined';

const Index = () => {
  const loginEl = useRef<HTMLDivElement>(null);
  const registerEl = useRef<HTMLDivElement>(null);

  const handleClick = (e) => {
    if (e.target.name === 'login') {
      loginEl.current.style.display = 'flex';
      registerEl.current.style.display = 'none';
    }
    if (e.target.name === 'register') {
      registerEl.current.style.display = 'flex';
      loginEl.current.style.display = 'none';
    }
  };

  return (
    <div>
      <Navbar auth={false} />

      {isBrowser() ? (
        <React.Suspense fallback={<Spinner />}>
          <Globe
            backgroundColor="#fbf3ea"
            globeImageUrl="/images/earthlights4k.jpg"
            // showGraticules
          />
        </React.Suspense>
      ) : null}
      <div className="auth__parent__container">
        <div className="login container" ref={loginEl}>
          <Login />
          <div style={{ display: 'flex' }}>
            new here?
            <button
              name="register"
              className="button__register landing__toggle__button"
              type="button"
              onClick={handleClick}
            >
              Register
            </button>
          </div>
        </div>
        <div className="register container" ref={registerEl}>
          <Register />
          <div style={{ display: 'flex' }}>
            have an account?
            <button
              name="login"
              className="button__login landing__toggle__button"
              type="button"
              onClick={handleClick}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
