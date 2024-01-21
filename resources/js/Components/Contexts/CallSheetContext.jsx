import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CallSheetContext = createContext();

export const useCallSheet = () => useContext(CallSheetContext);

export const CallSheetProvider = ({ children }) => {
   const [currentCallSheet, setCurrentCallSheet] = useState(null);
    
   const updateCurrentCallSheet = (newCallSheetData) => {
        setCurrentCallSheet(newCallSheetData);
   };
 



  return (
    <CallSheetContext.Provider value={{ 
        currentCallSheet,
        updateCurrentCallSheet,
    }}>

      {children}

    </CallSheetContext.Provider>
  );
};

 