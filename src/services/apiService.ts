/* eslint-disable arrow-body-style */
const BASE_URL = process.env.GATSBY_BASE_URL;

const notAuthenticatedPost = (route, body) => {
  return fetch(BASE_URL + route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

const authenticatedGet = (route) => {
  const token = localStorage.getItem('accessToken');
  return fetch(BASE_URL + route, {
    headers: {
      Authorization: `Bearer: ${token}`,
    },
  });
};

const login = (credentials): Promise<Response> => {
  console.log('im here in the api service');
  console.log(credentials);
  return notAuthenticatedPost('auth/login', credentials);
};

const register = (credentials): Promise<Response> => {
  return notAuthenticatedPost('auth/register', credentials);
};

const fetchGame = (): Promise<Response> => {
  return authenticatedGet('game');
};

const fetchLeaderboards = (): Promise<Response> => {
  return authenticatedGet('game/get-leaderboards');
};

const fetchUser = (): Promise<Response> => {
  return authenticatedGet('user');
};

const fetchAllUsers = (): Promise<Response> => {
  return authenticatedGet('userList');
};

export default {
  login,
  register,
  fetchGame,
  fetchUser,
  fetchAllUsers,
  fetchLeaderboards,
};
