import React, { useState } from 'react';
import { navigate } from 'gatsby';
import apiService from '../services/apiService';
import Navbar from '../components/presentational/Navbar';

const emptyCredentials = {
  email: '',
  password: '',
};

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState(emptyCredentials);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.login(credentials);
      if (response.ok) {
        const body = await response.json();
        localStorage.setItem('accessToken', body.token);
        navigate('/home');
        setCredentials(emptyCredentials);
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
    <div>
      <Navbar auth={false} />
      <div className="container page__container">
        <div className="container form__container">
          <form onSubmit={handleSubmit} className="container">
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
            {error ? <p>{error}</p> : null}
            <button
              type="submit"
              disabled={!(credentials.email && credentials.password)}
              className="button__primary"
            >
              log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
