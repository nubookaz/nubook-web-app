import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get('/fetch-user-data'); 
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);  

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);  
  console.log(user);
  return (
    <AuthContext.Provider value={{ user, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);