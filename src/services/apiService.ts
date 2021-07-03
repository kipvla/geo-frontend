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

// AUTH
const login = (credentials): Promise<Response> => {
  return fetchPost('auth/login', credentials);
};

const register = (credentials): Promise<Response> => {
  return fetchPost('auth/register', credentials);
};

// GAME
const fetchGame = (): Promise<Response> => {
  return fetchGet('game');
};

const updateGame = (turnDetails): Promise<Response> => {
  return fetchPut('game/update', turnDetails);
};

const startMultiplayerGame = () => {
  return fetchGet('game/multiplayer');
};

const fetchAllMultiplayerGames = (): Promise<Response> => {
  return fetchGet('game/all-multiplayer-games');
};

const fetchMultiplayerGamesByGameId = (gameID: string): Promise<Response> => {
  return fetchGet(`game/multiplayer/results/${gameID}`);
};

// USER
const fetchUser = (): Promise<Response> => {
  return fetchGet('user');
};

const fetchAllUsers = (): Promise<Response> => {
  return fetchGet('user/getAll');
};

// INVITATIONS
const sendFriendRequest = (username: string): Promise<Response> => {
  return fetchPut('user/add-friend', { friendName: username });
};

const acceptFriendRequest = (
  friendId: string,
  friendName: string
): Promise<Response> => {
  return fetchPut('user/accept-request', { friendId, friendName });
};

const declineFriendRequest = (friendId: string): Promise<Response> => {
  return fetchPut('user/decline-request', { friendId });
};

const sendGameInvite = (
  gameID: string,
  userToInviteID: string
): Promise<Response> => {
  return fetchPost('game/multiplayer/send-invite', { gameID, userToInviteID });
};

const acceptGameInvite = (gameID: string): Promise<Response> => {
  return fetchPost('game/multiplayer/accept-invite', {
    gameID,
  });
};

const declineGameInvite = (gameID: string): Promise<Response> => {
  return fetchPost('game/multiplayer/decline-invite', {
    gameID,
  });
};
const fetchLeaderboards = (): Promise<Response> => {
  return fetchGet('game/get-leaderboards');
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
  startMultiplayerGame,
  sendGameInvite,
  fetchAllMultiplayerGames,
  fetchMultiplayerGamesByGameId,
  acceptFriendRequest,
  declineFriendRequest,
  acceptGameInvite,
  declineGameInvite,
};
