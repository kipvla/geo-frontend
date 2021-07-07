import React, { useState } from 'react';
import { navigate } from 'gatsby';
import apiService from '../../services/apiService';

const emptyCredentials = {
  email: '',
  password: '',
};

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState(emptyCredentials);
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    try {
      const response = await apiService.login(credentials);
      if (response.ok) {
        const body = await response.json();
        localStorage.setItem('accessToken', body.token);
        navigate('/home');
        setCredentials(emptyCredentials);
      } else {
        setIsAuthenticating(false);
        const body = await response.json();
        setError(body.msg);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((old) => ({
      ...old,
      [name]: value,
    }));
    setError('');
  };

  return (
    <div className="home__auth__container">
      <div className="container landing__form__container">
        {isAuthenticating ? (
          <div>Authenticating...</div>
        ) : (
          <form onSubmit={handleSubmit} className="container auth__container">
            <input
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="email"
            />
            <input
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="password"
            />
            <button
              type="submit"
              disabled={!(credentials.email && credentials.password)}
              className="button__primary"
            >
              log in
            </button>
          </form>
        )}
      </div>
      {error ? (
        <p className="container error__container">{error}</p>
      ) : (
        <p
          className="container error__container"
          style={{ visibility: 'hidden' }}
        >
          {}
        </p>
      )}
    </div>
  );
};

export default Login;
