/* eslint-disable arrow-body-style */
const BASE_URL = process.env.GATSBY_BASE_URL;

// const authPost = (route, body) => {
//   const token = localStorage.getItem('accessToken');
//   return fetch(BASE_URL + route, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer: ${token}`,
//     },
//     body: JSON.stringify(body),
//   });
// };

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

const login = (credentials) => {
  console.log('im here in the api service');
  console.log(credentials);
  return notAuthenticatedPost('auth/login', credentials);
};

const register = (credentials) => {
  return notAuthenticatedPost('auth/register', credentials);
};

const fetchGame = (): Promise<Response> => {
  return authenticatedGet('game');
};

export default { login, register, fetchGame };
