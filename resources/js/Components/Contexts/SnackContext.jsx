import React, { createContext, useContext, useState } from 'react';

const SnackContext = createContext();

export const useSnack = () => useContext(SnackContext);

export const SnackProvider = ({ children }) => {
    const [isSnackOpen, setIsSnackOpen] = useState(false);
    const [snackContent, setSnackContent] = useState(null);


    return (
        <SnackContext.Provider value={{ 
            isSnackOpen,
            setIsSnackOpen,
            snackContent, 
            setSnackContent,
        }}>
            {children}
        </SnackContext.Provider>
    );
};
