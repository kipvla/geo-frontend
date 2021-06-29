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

const noAuthPost = (route, body) => {
  return fetch(BASE_URL + route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

const authGet = (route) => {
  const token = localStorage.getItem('accessToken');
  if (route === '/logout') localStorage.removeItem('accessToken');
  return fetch(BASE_URL + route, {
    headers: {
      Authorization: `Bearer: ${token}`,
    },
  });
};

const login = (credentials) => {
  console.log('im here in the api service');
  console.log(credentials);
  return noAuthPost('auth/login', credentials);
};

const register = (credentials) => {
  return noAuthPost('auth/register', credentials);
};

const fetchGame = (): Promise<Response> => {
  return authGet('game');
};

export default { login, register, fetchGame };
