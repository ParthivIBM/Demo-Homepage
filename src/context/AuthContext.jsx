import { createContext, useContext, useState } from 'react';

const USERS_KEY = 'auth_users';
const SESSION_KEY = 'auth_current_user';

// Minimal obfuscation — NOT real cryptographic security.
function encode(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function decode(str) {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch {
    return '';
  }
}

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) ?? [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem(SESSION_KEY) ?? null;
  });

  /**
   * register — creates a new user account and logs them in.
   * Returns null on success, or an error string on failure.
   */
  function register(username, password) {
    const trimmedUser = username.trim();
    if (!trimmedUser || !password) return 'Username and password are required.';

    const users = loadUsers();
    const exists = users.some(
      (u) => u.username.toLowerCase() === trimmedUser.toLowerCase()
    );
    if (exists) return 'Username is already taken.';

    const newUser = { username: trimmedUser, passwordHash: encode(password) };
    saveUsers([...users, newUser]);

    localStorage.setItem(SESSION_KEY, trimmedUser);
    setCurrentUser(trimmedUser);
    return null;
  }

  /**
   * login — authenticates an existing user.
   * Returns null on success, or an error string on failure.
   */
  function login(username, password) {
    const trimmedUser = username.trim();
    if (!trimmedUser || !password) return 'Username and password are required.';

    const users = loadUsers();
    const found = users.find(
      (u) => u.username.toLowerCase() === trimmedUser.toLowerCase()
    );
    if (!found) return 'No account found with that username.';
    if (decode(found.passwordHash) !== password) return 'Incorrect password.';

    localStorage.setItem(SESSION_KEY, found.username);
    setCurrentUser(found.username);
    return null;
  }

  /**
   * logout — clears the current session.
   */
  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
