// DrawerContext.js
import React, { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export const useDrawer = () => useContext(DrawerContext);

export const DrawerProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const [drawerWidth, setDrawerWidth] = useState('normal'); // 'normal', 'wide', etc.

  const toggleDrawer = (isOpen = null) => {
    setIsDrawerOpen(isOpen !== null ? isOpen : !isDrawerOpen);
  };

  const updateDrawerContent = (content) => {
    setDrawerContent(content);
  };

  const expandDrawer = (width = 'wide') => {
    setDrawerWidth(width);
  };

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, drawerContent, toggleDrawer, updateDrawerContent, drawerWidth, expandDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};
