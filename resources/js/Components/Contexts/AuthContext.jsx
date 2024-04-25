import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
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
    latestProfileImageUrl: null,
    defaultProfileImageUrl: '',
    isLoading: false,  // Added loading state
  });

  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await axios.get('/fetch-auth-status');
      const isLoggedIn = response.data.loggedIn;
      const userData = response.data.user ? response.data.user : null;

      setAuthState(prevState => ({
        ...prevState,
        loggedIn: isLoggedIn,
        userData: userData,
        isLoading: false, 
      }));

      determineCurrentStep(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setAuthState(prevState => ({
          ...prevState,
          loggedIn: false,
          userData: null,
          message: 'Session has expired. Please log in again.',
          isLoading: false, 
        }));
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  }, []);

  const updateDefaultProfileImage = useCallback(() => {
    const currentDate = new Date();
    const imageIndex = currentDate.getDate() % 12;
    const defaultImagePath = `/images/profile_images/profile_image_${imageIndex + 1}.svg`;
    setAuthState(prevState => ({
      ...prevState,
      defaultProfileImageUrl: defaultImagePath,
    }));
  }, []);

  const determineCurrentStep = useCallback((data) => {
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
    } else {
      step = '';
      modalOpen = false;
    }

    setAuthState(prevState => ({
      ...prevState,
      currentStep: step,
      isModalOpen: modalOpen,
    }));
  }, []);

  const setCurrentStep = useCallback((step) => {
    setAuthState(prevState => ({
      ...prevState,
      currentStep: step,
    }));
  }, []);

  const setIsModalOpen = useCallback((isOpen) => {
    setAuthState(prevState => ({
      ...prevState,
      isModalOpen: isOpen,
    }));
  }, []);

  const fetchProfileImage = useCallback(async () => {
    try {
      const response = await axios.get('/profile/get-profile-image');
      if (response.data && response.data.imageUrl && response.data.imageUrl !== authState.userData?.profile_image) {
        setAuthState(prevState => ({
          ...prevState,
          userData: { ...prevState.userData, profile_image: response.data.imageUrl },
          latestProfileImageUrl: response.data.imageUrl,
        }));
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  }, [authState.userData]);

  const uploadProfileImage = useCallback(async (uploadedFile) => {
    const formData = new FormData();
    formData.append('profileImage', uploadedFile);

    try {
      const response = await axios.post('/profile/upload-profile-image', formData);
      if (response.data.imageUrl) {
        setAuthState(prevState => ({
          ...prevState,
          userData: { ...prevState.userData, profile_image: response.data.imageUrl },
          latestProfileImageUrl: response.data.imageUrl,
        }));
      }
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
    updateDefaultProfileImage();
  }, [checkAuthStatus, updateDefaultProfileImage]);

  useEffect(() => {
    if (authState.loggedIn && authState.userData) {
      fetchProfileImage();
    }
  }, [authState.loggedIn, authState.userData, fetchProfileImage]);

  const contextValue = useMemo(() => ({
    ...authState,
    setCurrentStep,
    setIsModalOpen,
    fetchProfileImage,
    uploadProfileImage,
  }), [authState, setCurrentStep, setIsModalOpen, fetchProfileImage, uploadProfileImage]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
