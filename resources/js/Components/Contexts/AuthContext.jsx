import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    loggedIn: false,
    currentStep: '',
    isModalOpen: false,
    userData: null,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/fetch-auth-status');
      const isLoggedIn = response.data.loggedIn;
      const userData = response.data.user ? response.data.user : null; // Assuming the backend includes user data

      setAuthState(prevState => ({
        ...prevState,
        loggedIn: isLoggedIn,
        userData: userData,
      }));

      determineCurrentStep(response.data); // Pass the entire response to handle steps
    } catch (error) {
      console.error('User not logged in', error);
    }
  };

  const determineCurrentStep = (data) => {
    let step = '';
    let modalOpen = false;

    if (data.isPasswordTemporary) {
      step = 'changePassword';
      modalOpen = true;
    } else if (!data.emailVerified) {
      step = 'verification';
      modalOpen = true;
    } else if (!data.personalInfoCompleted) {
      step = 'personalInfo';
      modalOpen = true;
    } else if (!data.companyInfoCompleted) {
      step = 'companyInfo';
      modalOpen = true;
    } else if (!data.registrationComplete) {
      step = '';
      modalOpen = false;
    }

    setAuthState(prevState => ({
      ...prevState,
      currentStep: step,
      isModalOpen: modalOpen,
    }));
  };

  const setCurrentStep = (step) => {
    setAuthState(prevState => ({
      ...prevState,
      currentStep: step,
    }));
  };

  const setIsModalOpen = (isOpen) => {
    setAuthState(prevState => ({
      ...prevState,
      isModalOpen: isOpen,
    }));
  };

  const contextValue = {
    ...authState,
    setCurrentStep,
    setIsModalOpen,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};