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

  if (isAuthenticating) {
    return <div className="container">Authenticating...</div>;
  }

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
      <div className="form-input">
        <input
          name="password"
          type="password"
          className="form-item__input form-item__input--password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="password"
        />
      </div>
      <div className="form-actions">
        <div className="form-actions__submit">
          <button
            type="submit"
            disabled={!(credentials.email && credentials.password)}
            className="button__primary"
          >
            log in
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
