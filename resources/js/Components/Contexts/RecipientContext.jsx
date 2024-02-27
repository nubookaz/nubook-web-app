import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; 
import { useProject } from './ProjectContext';  

const RecipientContext = createContext();

export const useRecipient = () => useContext(RecipientContext);

export const RecipientProvider = ({ children }) => {
  const { currentProjectId } = useProject();
  const [callSheetRecipients, setCallSheetRecipients] = useState([]);



  
  useEffect(() => {
    if (currentProjectId) { // Check if there's a current project selected
      const fetchRecipients = async () => {
        try {
          // Adjust the API endpoint to include the currentProjectId
          const response = await axios.get(`/api/projects/${currentProjectId}/recipients`);
          setCallSheetRecipients(response.data);
        } catch (error) {
          console.error("Failed to fetch recipients:", error);
        }
      };

      fetchRecipients();
    }
  }, [currentProjectId]); // Add currentProjectId as a dependency

  const createRecipient = async (recipientData) => {
    if (!currentProjectId) return; // Guard clause if no project is selected
    try {
      // Adjust the API call to include the currentProjectId
      const response = await axios.post(`/api/projects/${currentProjectId}/recipients`, recipientData);
      setCallSheetRecipients(prev => [...prev, response.data]);
    } catch (error) {
      console.error("Failed to create recipient:", error);
    }
  };

  const updateRecipient = async (recipientId, updatedData) => {
    if (!currentProjectId) return; // Guard clause if no project is selected
    try {
      // Adjust the API call to include the currentProjectId
      await axios.put(`/api/projects/${currentProjectId}/recipients/${recipientId}`, updatedData);
      setCallSheetRecipients(prev => prev.map(recipient => recipient.id === recipientId ? {...recipient, ...updatedData} : recipient));
    } catch (error) {
      console.error("Failed to update recipient:", error);
    }
  };

  const deleteRecipient = async (recipientId) => {
    if (!currentProjectId) return; // Guard clause if no project is selected
    try {
      // Adjust the API call to include the currentProjectId
      await axios.delete(`/api/projects/${currentProjectId}/recipients/${recipientId}`);
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