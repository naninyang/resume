import React, { useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (token, user) => {
    localStorage.setItem('token', token);
    Cookies.set('token', token, { expires: 14 });
    setLoggedIn(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    Cookies.remove('token');
    setLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    if (localStorage.getItem('token') && Cookies.get('token')) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
