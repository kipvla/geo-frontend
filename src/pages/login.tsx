import React, { useState } from 'react';
import { navigate } from 'gatsby';
import apiService from '../services/apiService';
import { useAuthContext } from '../lib/context/authContext';

const emptyCredentials = {
  email: '',
  password: '',
};

const Login: React.FC = () => {
  const { setAuthenticated } = useAuthContext();
  const [credentials, setCredentials] = useState(emptyCredentials);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.login(credentials);
      if (response.ok) {
        const body = await response.json();
        localStorage.setItem('accessToken', body.token);
        setAuthenticated(true);
        setCredentials(emptyCredentials);
        navigate('/game');
      } else {
        const body = await response.json();
        setError(body.msg);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChange = ({ target }) => {
    setCredentials((old) => ({
      ...old,
      [target.name]: target.value,
    }));
    setError('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div className="login__navbar" />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90vh',
        }}
      >
        <div className="login__form__container">
          <form onSubmit={handleSubmit} className="login__form">
            <input
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Email"
              className="login__form__input"
              style={{ height: '36px' }}
            />
            <input
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              className="login__form__input"
            />
            {error ? <p>{error}</p> : null}
            <button
              type="submit"
              disabled={!(credentials.email && credentials.password)}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
