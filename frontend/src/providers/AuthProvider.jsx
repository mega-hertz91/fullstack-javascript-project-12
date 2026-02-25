import { useState, useEffect } from 'react';
import { AuthContext } from '../context';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [token]);

  const login = async ({ username, password }) => {
    try {
      const res = await fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.status === 401) {
      throw new Error("Invalid login or password");
    }

    if (!res.ok) {
      throw new Error("An error occurred during login");
    }

    const { token = null } = await res.json();
    setToken(token);
    } catch (error) {
      throw new Error( error.message);
    }
  };

  const logout = () => {
    setToken(null);
  };

  const value = {
    token,
    isAuthenticated: !!token,
    username: '',
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
