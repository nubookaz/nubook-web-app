import React, { createContext, useContext, useState, useEffect } from 'react';

const RecipientContext = createContext();

export const useRecipient = () => useContext(RecipientContext);

export const RecipientProvider = ({ children }) => {
  const [callSheetRecipients, setCallSheetRecipients] = useState([]);

  const addRecipientToCallSheet = (callSheetId, responseData) => {
      if (responseData.success && responseData.data && responseData.data.user) {
          const { user, call_time, position, role } = responseData.data;

          // Construct the recipient object in the expected format
          const recipient = {
              ...user,
              pivot: {
                  call_sheet_id: callSheetId, // Ensure this matches the call sheet the recipient was added to
                  call_time: call_time || user.pivot?.call_time,
                  position: position || user.pivot?.position,
                  role_name: role || user.pivot?.role_name,
                  user_id: user.id,
              },
              // Assuming the phone data structure matches what's expected, otherwise adjust as needed
              phone: user.phone || {},
          };

          setCallSheetRecipients(prevRecipients => [...prevRecipients, recipient]);
      }
  };

  const removeRecipientFromCallSheet = (recipientId) => {
    setCallSheetRecipients(prev => prev.filter(recipient => recipient.id !== recipientId));
  };

  return (
    <RecipientContext.Provider value={{ 
        addRecipientToCallSheet,
        removeRecipientFromCallSheet,
        callSheetRecipients,
    }}>

      {children}

    </RecipientContext.Provider>
  );
};

 