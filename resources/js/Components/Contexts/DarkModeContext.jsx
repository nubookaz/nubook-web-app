import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
    const { userData, loggedIn } = useAuth();
    const [darkModeSetting, setDarkModeSetting] = useState('light');

    useEffect(() => {
        if (loggedIn && userData) {
            fetchDarkModeSetting();
        }
    }, [loggedIn, userData]);

    const fetchDarkModeSetting = async () => {
        if (userData && userData.id) {
            try {
                const response = await axios.get(`/user/${userData.id}/dark-mode`);
                setDarkModeSetting(response.data.dark_mode_setting);
            } catch (error) {
                console.error('Error fetching dark mode setting:', error);
            }
        }
    };

    const updateDarkModeSetting = async (newSetting) => {
        if (userData && userData.id) {
            try {
                const response = await axios.put(`/user/${userData.id}/dark-mode`, {
                    dark_mode_setting: newSetting
                });

                if (response.status === 200) {
                    setDarkModeSetting(newSetting);
                } else {
                    console.error('Error updating dark mode setting');
                }
            } catch (error) {
                console.error('Error updating dark mode setting:', error);
            }
        }
    };

    return (
        <DarkModeContext.Provider value={{
            darkModeSetting, 
            setDarkModeSetting: updateDarkModeSetting,
        }}>
            {children}
        </DarkModeContext.Provider>
    );
};
