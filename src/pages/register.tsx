import React, { useState } from 'react';
import { navigate } from 'gatsby';
import apiService from '../services/apiService';
import Navbar from '../components/presentational/Navbar';

const emptyCredentials = {
  email: '',
  username: '',
  password: '',
  passwordRepeat: '',
};

const Register: React.FC = () => {
  const [credentials, setCredentials] = useState(emptyCredentials);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.register(credentials);
      if (response.ok) {
        const body = await response.json();
        localStorage.setItem('accessToken', body.token);
        navigate('/login');
        setCredentials(emptyCredentials);
      } else {
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
              style={{ height: '36px' }}
            />
            <input
              name="username"
              type="text"
              value={credentials.username}
              onChange={handleChange}
              placeholder="username"
            />
            <input
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="password"
            />
            <input
              name="passwordRepeat"
              type="password"
              value={credentials.passwordRepeat}
              onChange={handleChange}
              placeholder="verify password"
            />
            <button
              type="submit"
              disabled={
                !(
                  credentials.email &&
                  credentials.username &&
                  credentials.password &&
                  credentials.passwordRepeat
                )
              }
              className="button__primary"
            >
              register
            </button>
          </form>
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
    </div>
  );
};

export default Register;
