'use client'

import { createContext, useState, useEffect } from 'react';

export const BottomNavContext = createContext();
export const TopNavContext = createContext();
export const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const BottomNavProvider = ({ children }) => {
  const [isBottomNavHidden, setIsBottomNavHidden] = useState(false);
  return (
    <BottomNavContext.Provider value={{ isBottomNavHidden, setIsBottomNavHidden }}>
      {children}
    </BottomNavContext.Provider>
  );
};

export const TopNavProvider = ({ children }) => {
  const [isTopNavHidden, setIsTopNavHidden] = useState(false);
  return (
    <TopNavContext.Provider value={{ isTopNavHidden, setIsTopNavHidden }}>
      {children}
    </TopNavContext.Provider>
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
