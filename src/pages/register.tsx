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
        setCredentials(emptyCredentials);
        navigate('/login');
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
      <Navbar />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
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
              name="username"
              type="text"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Username"
              className="login__form__input"
            />
            <input
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              className="login__form__input"
            />
            <input
              name="passwordRepeat"
              type="password"
              value={credentials.passwordRepeat}
              onChange={handleChange}
              placeholder="Repeat Password"
              className="login__form__input"
            />
            {error ? <p>{error}</p> : null}
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
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
