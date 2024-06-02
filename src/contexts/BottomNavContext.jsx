'use client'

import { createContext, useState, useEffect } from 'react';

export const BottomNavContext = createContext();
export const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const BottomNavProvider = ({ children }) => {
  const [hideBottomNav, setHideBottomNav] = useState(false);

  const toggleBottomNav = (hide) => {
    setHideBottomNav(hide);
  };
  return (
    <BottomNavContext.Provider value={{ hideBottomNav, toggleBottomNav }}>
      {children}
    </BottomNavContext.Provider>
  );
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }else{
      setIsLoggedIn(false)
    }
  }, []);

  const login = (userData) => {
    // Simulate login logic (replace with your backend call)
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
