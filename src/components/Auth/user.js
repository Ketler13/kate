export function getUser() {
  const user = localStorage.getItem('ancor-user');

  return user ? JSON.parse(user) : null;
}

export function setUser(user) {
  localStorage.setItem('ancor-user', JSON.stringify(user));
}

export function deleteUser() {
  localStorage.removeItem('ancor-user');
}