import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// This line is the key: it uses the live URL when deployed, or your local IP for development.
const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.119:5001';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;
    setUser(userInfoFromStorage);
  }, []);

  const login = async (email, password) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `${API_URL}/api/users/login`, // <-- UPDATED
        { email, password },
        config
      );
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setError(null);
      navigate('/');
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  const register = async (name, email, password) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `${API_URL}/api/users/register`, // <-- UPDATED
        { name, email, password },
        config
      );
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setError(null);
      navigate('/');
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};