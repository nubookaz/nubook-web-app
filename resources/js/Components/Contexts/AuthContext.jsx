// AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/fetch-user-data');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleUpdate = () => {
    // Trigger a fetch when the update event occurs
    fetchUserData();
  };

  useEffect(() => {
    // Listen for the custom update event
    window.addEventListener('updateUserData', handleUpdate);
 
    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      window.removeEventListener('updateUserData', handleUpdate);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
