export const BASE_URL = 'http"//api.melomori.nomoredomains.xyz';
// export const BASE_URL = 'http://localhost:3000';

const checkServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = ({ password, email }) => {
  console.log(BASE_URL);
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  }).then(checkServerResponse);
};

export const authorize = ({ password, email }) => {
  console.log(BASE_URL);
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  }).then(checkServerResponse);
};

export const checkToken = () => {
  console.log(`${BASE_URL}/users/me`);
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  }).then(checkServerResponse);
};
