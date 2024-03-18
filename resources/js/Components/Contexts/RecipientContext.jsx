import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; 
import { useProject } from './ProjectContext';  
import { useCallSheet } from './CallSheetContext'; 

const RecipientContext = createContext();

export const useRecipient = () => useContext(RecipientContext);

export const RecipientProvider = ({ children }) => {
  const { currentProjectId } = useProject();
  const { currentCallSheetId } = useCallSheet(); 
  const [callSheetRecipients, setCallSheetRecipients] = useState([]);



  
  useEffect(() => {
    if (currentProjectId) { // Check if there's a current project selected
      const fetchRecipients = async () => {
        try {
          // Adjust the API endpoint to include the currentProjectId
          // const response = await axios.get(route('projects.callSheets.recipient', {projectId: currentProjectId, callSheetId: currentCallSheetId}));
          // setCallSheetRecipients(response.data);
        } catch (error) {
          console.error("Failed to fetch recipients:", error);
        }
      };

      fetchRecipients();
    }
  }, [currentProjectId, currentCallSheetId]); 

  const createRecipient = async (recipientData) => {
    if (!currentProjectId || !currentCallSheetId) return; // Guard clause if no project or call sheet is selected
    try {
      // Adjust the API call to include both currentProjectId and currentCallSheetId
      const response = await axios.post(`/api/projects/${currentProjectId}/call-sheets/${currentCallSheetId}/recipients`, recipientData);
      setCallSheetRecipients(prev => [...prev, response.data]);
    } catch (error) {
      console.error("Failed to create recipient:", error);
    }
  };

  const updateRecipient = async (recipientId, updatedData) => {
    if (!currentProjectId || !currentCallSheetId) return; // Guard clause if no project or call sheet is selected
    try {
      // Adjust the API call to include both currentProjectId and currentCallSheetId
      await axios.put(`/api/projects/${currentProjectId}/call-sheets/${currentCallSheetId}/recipients/${recipientId}`, updatedData);
      setCallSheetRecipients(prev => prev.map(recipient => recipient.id === recipientId ? {...recipient, ...updatedData} : recipient));
    } catch (error) {
      console.error("Failed to update recipient:", error);
    }
  };

  const deleteRecipient = async (recipientId) => {
    if (!currentProjectId || !currentCallSheetId) return; // Guard clause if no project or call sheet is selected
    try {
      // Adjust the API call to include both currentProjectId and currentCallSheetId
      await axios.delete(`/api/projects/${currentProjectId}/call-sheets/${currentCallSheetId}/recipients/${recipientId}`);
      setCallSheetRecipients(prev => prev.filter(recipient => recipient.id !== recipientId));
    } catch (error) {
      console.error("Failed to delete recipient:", error);
    }
  };

  return (
    <RecipientContext.Provider value={{ 
        callSheetRecipients,
        createRecipient,
        updateRecipient,
        deleteRecipient
    }}>
      {children}
    </RecipientContext.Provider>
  );
};
