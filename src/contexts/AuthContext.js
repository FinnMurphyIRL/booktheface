import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      console.log('Checking auth, token:', token ? 'exists' : 'does not exist');
      if (token) {
        try {
          const response = await api.get('/auth/verify');
          setAuth(true);
          setUser(response.data.user);
          console.log('Auth verified');
        } catch (error) {
          console.error('Auth verification failed:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setAuth(true);
      setUser(response.data.user);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    setUser(null);
  };

  console.log('AuthProvider render - auth:', auth, 'loading:', loading);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};