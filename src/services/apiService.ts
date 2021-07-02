/* eslint-disable arrow-body-style */
// const BASE_URL = process.env.GATSBY_BASE_URL;
const BASE_URL = 'http://localhost:3000/';

interface Init {
  headers: Headers;
  method: string;
  body?: any;
}

const fetchFactory = (route, method = 'GET', body = '') => {
  const url = BASE_URL + route;
  const init: Init = {
    headers: new Headers(),
    method,
  };
  const token = localStorage.getItem('accessToken');
  if (token) {
    init.headers.set('Authorization', `Bearer: ${token}`);
  }
  if (body) {
    init.body = JSON.stringify(body);
    init.headers.set('Content-Type', 'application/json');
  }
  return fetch(url, init);
};
const fetchGet = (route) => fetchFactory(route);
const fetchPost = (route, body) => fetchFactory(route, 'POST', body);

const login = (credentials): Promise<Response> => {
  return fetchPost('auth/login', credentials);
};

const register = (credentials): Promise<Response> => {
  return fetchPost('auth/register', credentials);
};

const fetchGame = (): Promise<Response> => {
  return fetchGet('game');
};

const fetchLeaderboards = (): Promise<Response> => {
  return fetchGet('game/get-leaderboards');
};

const fetchUser = (): Promise<Response> => {
  return fetchGet('user');
};

const fetchAllUsers = (): Promise<Response> => {
  return fetchGet('user/getAll');
};

export default {
  login,
  register,
  fetchGame,
  fetchUser,
  fetchAllUsers,
  fetchLeaderboards,
};
