import React, { createContext, useContext, useState, useEffect } from 'react';

const CallSheetContext = createContext();

export const useCallSheet = () => useContext(CallSheetContext);

export const CallSheetProvider = ({ children }) => {
   const [currentCallSheet, setCurrentCallSheet] = useState(null);
   const [callSheetRecipients, setCallSheetRecipients] = useState([]);

   const updateCurrentCallSheet = (newCallSheetData) => {
    setCurrentCallSheet(prevCallSheet => ({
      ...prevCallSheet,
      ...newCallSheetData
    }));
  };

 
  return (
    <CallSheetContext.Provider value={{ 
        currentCallSheet,
        updateCurrentCallSheet,
        callSheetRecipients,
    }}>

      {children}

    </CallSheetContext.Provider>
  );
};

 