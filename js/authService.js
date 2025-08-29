// js/authService.js
const API_URL = 'https://68b054b83b8db1ae9c039b7d.mockapi.io/users';

export async function login(username, password) {
  const res = await fetch(`${API_URL}?username=${username}&password=${password}`);
  const data = await res.json();
  if (data.length > 0) {
    localStorage.setItem('currentUser', JSON.stringify(data[0]));
    return data[0];
  } else {
    throw new Error('Sai username hoặc password');
  }
}

export function logout() {
  localStorage.removeItem('currentUser');
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

export function isLoggedIn() {
  return !!getCurrentUser();
}
