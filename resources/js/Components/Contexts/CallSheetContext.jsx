import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useProject } from './ProjectContext'; // Ensure this path matches your file structure
import { router } from '@inertiajs/react'; 

const CallSheetContext = createContext();

export const useCallSheet = () => useContext(CallSheetContext);

export const CallSheetProvider = ({ children }) => {
    const { currentProjectId } = useProject();
    const [callSheets, setCallSheets] = useState([]);
    const [currentCallSheetId, setCurrentCallSheetId] = useState(() => localStorage.getItem('currentCallSheetId'));
    const [currentCallSheet, setCurrentCallSheet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (!isLoading && callSheets.length > 0) {
            const sheet = callSheets.find(sheet => sheet.id.toString() === currentCallSheetId);
            setCurrentCallSheet(sheet || null);
        }
    }, [callSheets, currentCallSheetId, isLoading]);

    const fetchCallSheets = async () => {
        setIsLoading(true);  
        if (currentProjectId) {
            try {
                const response = await axios.get(route('fetch-user-call-sheets', {projectId: currentProjectId}));
                setCallSheets(response.data);
                setIsLoading(false); 
            } catch (error) {
                console.error("Failed to fetch call sheets:", error);
                setIsLoading(false);  
            }
        } else {
            setIsLoading(false); 
        }
    };
    
  
    useEffect(() => {
        fetchCallSheets();
    }, [currentProjectId]);

    const createCallSheet = async (callSheetData) => {
        if (!currentProjectId) return;
        try {
            const response = await axios.post(route('callSheet.create', { projectId: currentProjectId }), callSheetData);
            console.log('CallSheetProvider', response);
                if (response.data && response.data.url) {
                window.location.href = response.data.url;
            } else {
                if (response.data && response.data.id) {
                    setCallSheets(prev => [...prev, response.data]);
                } else {
                    console.log('Unexpected response data:', response.data);
                }
            }
        } catch (error) {
            console.error("Failed to create call sheet:", error);
        }
    };
    
    

    const updateCallSheet = async (callSheetId, updatedCallSheetData) => {
        if (!currentProjectId) return;
        try {
            // Matching the Laravel route for updating a call sheet within a specific project
            await axios.post(`/api/projects/${currentProjectId}/call-sheets/${callSheetId}`, updatedCallSheetData);
            setCallSheets(prev => prev.map(callSheet => callSheet.id === callSheetId ? { ...callSheet, ...updatedCallSheetData } : callSheet));
            if (currentCallSheetId === callSheetId) {
                setCurrentCallSheetId({ ...currentCallSheetId, ...updatedCallSheetData });
            }
        } catch (error) {
            console.error("Failed to update call sheet:", error);
        }
    };

    const deleteCallSheet = async (callSheetId) => {
        if (!currentProjectId) return;
        try {
            // Matching the Laravel route for deleting a call sheet within a specific project
            await axios.delete(`/api/projects/${currentProjectId}/call-sheets/${callSheetId}/softDelete`);
            setCallSheets(prev => prev.filter(callSheet => callSheet.id !== callSheetId));
            if (currentCallSheetId === callSheetId) {
                setCurrentCallSheetId(null);
            }
        } catch (error) {
            console.error("Failed to delete call sheet:", error);
        }
    };

    return (
        <CallSheetContext.Provider value={{
            callSheets,
            currentCallSheet,
            currentCallSheetId,
            createCallSheet,
            updateCallSheet,
            deleteCallSheet,
            setCurrentCallSheetId,  
        }}>
            {children}
        </CallSheetContext.Provider>
    );
};
