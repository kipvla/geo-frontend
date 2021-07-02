/* eslint-disable arrow-body-style */
const BASE_URL = process.env.GATSBY_BASE_URL;

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
const fetchPut = (route, body) => fetchFactory(route, 'PUT', body);

const login = (credentials): Promise<Response> => {
  return fetchPost('auth/login', credentials);
};

const register = (credentials): Promise<Response> => {
  return fetchPost('auth/register', credentials);
};

const fetchGame = (): Promise<Response> => {
  return fetchGet('game');
};

const fetchAllMultiplayerGames = (): Promise<Response> => {
  return fetchGet('game/all-multiplayer-games');
};

const fetchMultiplayerGamesByGameId = (gameID: string): Promise<Response> => {
  return fetchGet(`/multiplayer/results/${gameID}`);
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

const sendFriendRequest = (username: string): Promise<Response> => {
  return fetchPut('user/add-friend', { friendName: username });
};
const addFriend = (friendId: string, friendName: string): Promise<Response> => {
  return fetchPut('user/add-friend', { friendId, friendName });
};
const declineFriendRequest = (friendId: string): Promise<Response> => {
  return fetchPut('user/decline-request', { friendId });
};

const updateGame = (turnDetails): Promise<Response> => {
  return fetchPut('game/update', turnDetails);
};

export default {
  login,
  register,
  fetchGame,
  updateGame,
  fetchUser,
  fetchAllUsers,
  fetchLeaderboards,
  sendFriendRequest,
  fetchAllMultiplayerGames,
  fetchMultiplayerGamesByGameId,
  addFriend,
  declineFriendRequest,
};
