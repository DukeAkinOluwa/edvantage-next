import { createContext, useState } from 'react';

export const BottomNavContext = createContext();

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