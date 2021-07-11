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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((old) => ({
      ...old,
      [name]: value,
    }));
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="form container form--landing">
      {error && (
        <div className="form__error">
          <p className="form__error container error__container">{error}</p>
        </div>
        // <FormError error={error} />
      )}
      <div className="form-item">
        <input
          name="email"
          type="email"
          className="form-item__input"
          value={credentials.email}
          onChange={handleChange}
          placeholder="email"
        />
      </div>
      <div className="form-item">
        <input
          name="username"
          type="text"
          value={credentials.username}
          onChange={handleChange}
          placeholder="username"
        />
      </div>
      <div className="form-item">
        <input
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="password"
        />
      </div>
      <div className="form-item">
        <input
          name="passwordRepeat"
          type="password"
          value={credentials.passwordRepeat}
          onChange={handleChange}
          placeholder="verify password"
        />
      </div>
      <div className="form-actions">
        <div className="form-actions__submit">
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
        </div>
      </div>
    </form>
  );
};

export default Register;
