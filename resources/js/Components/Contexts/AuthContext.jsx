import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    loggedIn: false,
    currentStep: '',
    isModalOpen: false,
    userData: null,  
  });

  const setCurrentStep = (step) => {
    setAuthState((prevState) => ({
      ...prevState,
      currentStep: step,
    }));
  };

  const setIsModalOpen = (isOpen) => {
    setAuthState((prevState) => ({
      ...prevState,
      isModalOpen: isOpen,
    }));
  };

  useEffect(() => {
    checkAuthStatus();
    fetchUserData(); 
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/fetch-auth-status');
      determineCurrentStep(response.data); 
    } catch (error) {
      console.error('Failed to fetch auth status', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/fetch-user-data');
      setAuthState(prevState => ({
        ...prevState,
        userData: response.data, 
      }));
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };


  const determineCurrentStep = (userData) => {
    let step = '';
    let modalOpen = false;

    if (userData.isPasswordTemporary) {
      step = 'changePassword';
      modalOpen = true;
    } else if (!userData.emailVerified) {
      step = 'verification';
      modalOpen = true;
    } else if (!userData.personalInfoCompleted) {
      step = 'personalInfo';
      modalOpen = true;
    } else if (!userData.companyInfoCompleted) {
      step = 'companyInfo';
      modalOpen = true;
    } else if (!userData.registrationComplete) {
      step = '';  
      modalOpen = false;  
    }

    setAuthState((prevState) => ({
      ...prevState,
      currentStep: step,
      isModalOpen: modalOpen,
    }));
};


  const contextValue = {
    ...authState,
    checkAuthStatus,
    fetchUserData, 
    setCurrentStep, 
    setIsModalOpen, 
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
