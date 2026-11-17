import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  loginUser,
  registerUser,
  logoutUser,
  getStoredUser,
  setStoredUser,
  getStoredToken,
  setStoredToken,
  clearStoredAuth,
  fetchCurrentUser
} from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [token, setToken] = useState(() => getStoredToken());
  const [isLoading, setIsLoading] = useState(false);

  // Revalidate session on initial mount if token/user is stored
  useEffect(() => {
    const storedUser = getStoredUser();
    const storedToken = getStoredToken();

    if (storedUser && storedUser.id && storedToken) {
      fetchCurrentUser(storedUser.id, storedToken)
        .then((res) => {
          if (res && res.user) {
            setUser(res.user);
            setStoredUser(res.user);
          }
        })
        .catch(() => {
          // If server restarted or token invalidated, keep optimistic or clear
        });
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await loginUser({ email, password });
      setUser(data.user);
      setToken(data.token);
      setStoredUser(data.user);
      setStoredToken(data.token);
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async ({ name, email, password, avatar }) => {
    setIsLoading(true);
    try {
      const data = await registerUser({ name, email, password, avatar });
      setUser(data.user);
      setToken(data.token);
      setStoredUser(data.user);
      setStoredToken(data.token);
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      // ignore
    } finally {
      setUser(null);
      setToken(null);
      clearStoredAuth();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
