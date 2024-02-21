import React, { createContext, useContext, useState } from 'react';

const CallSheetLocationContext = createContext();

export const useCallSheetLocation = () => useContext(CallSheetLocationContext);

export const CallSheetLocationProvider = ({ children }) => {
   const [currentCallSheetLocation, setCurrentCallSheetLocation] = useState(null);
    
   const updateCurrentCallSheetLocation = (newCallSheetLocationData) => {
    setCurrentCallSheetLocation(newCallSheetLocationData);
};




  return (
    <CallSheetLocationContext.Provider value={{ 
        currentCallSheetLocation,
        updateCurrentCallSheetLocation,
    }}>

      {children}

    </CallSheetLocationContext.Provider>
  );
};

 