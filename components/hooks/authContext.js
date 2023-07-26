import React, { useState, useContext, useEffect } from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);  // 추가된 부분

  const login = (token, user) => {  // 인자가 하나 추가됨
    localStorage.setItem('token', token);
    setLoggedIn(true);
    setUser(user);  // 추가된 부분
  };

  const logout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUser(null);  // 추가된 부분
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
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
