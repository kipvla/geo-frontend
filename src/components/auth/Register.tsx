import React, { useState } from 'react';
import { navigate } from 'gatsby';
import apiService from '../../services/apiService';

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
    <div className="">
      <div className="container form__register">
        <form onSubmit={handleSubmit} className="container auth__container">
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
  );
};

export default Register;
