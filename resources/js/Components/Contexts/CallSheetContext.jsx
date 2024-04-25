import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useProject } from './ProjectContext'; 
import { useAuth } from '@/Components/Contexts/AuthContext';

import { router } from '@inertiajs/react'; 

const CallSheetContext = createContext();

export const useCallSheet = () => useContext(CallSheetContext);

export const CallSheetProvider = ({ children }) => {
    const { loggedIn } = useAuth();

    const { currentProjectId } = useProject();
    const [callSheets, setCallSheets] = useState([]);
    const [currentCallSheetId, setCurrentCallSheetId] = useState('');
    const [currentCallSheet, setCurrentCallSheet] = useState(null);
    console.log(currentProjectId);

    useEffect(() => {
        if (callSheets.length > 0) {
            console.log(callSheets);

            const sheet = callSheets.find(sheet => sheet.callSheetId === currentCallSheetId);
            setCurrentCallSheet(sheet || null);
        }
    }, [callSheets, currentCallSheetId]);

    const fetchCallSheets = async () => {
        if (currentProjectId) {
            try {
                const response = await axios.get(`/projects/${currentProjectId}/call-sheets/fetch-call-sheets`);
                setCallSheets(response.data);
            } catch (error) {
                console.error("Failed to fetch call sheets:", error);
            }
        }  
     };

     useEffect(() => {
        if(loggedIn){
            fetchCallSheets();
        }
    }, [loggedIn, currentProjectId]);
 
    const createCallSheet = async (callSheetData) => {
         try {
            const response = await axios.post(`/projects/${callSheetData.project_id}/call-sheets/create`, callSheetData);
            if (response.data && response.data.callSheetId) {
                console.log(response);

                setCallSheets(prev => [...prev, response.data]);
                setCurrentCallSheetId(response.data.callSheetId);
            } else {
                console.log('Unexpected response data:', response.data);
            }
        } catch (error) {
            console.error("Failed to create call sheet:", error);
        }
     };
    
    console.log(currentCallSheetId);
    const updateCallSheet = async (callSheetId, updatedCallSheetData) => {
        if (!currentProjectId) return;
        try {
            await axios.post(`/projects/${currentProjectId}/call-sheets/${callSheetId}`, updatedCallSheetData);
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
            await axios.delete(`/projects/${currentProjectId}/call-sheets/${callSheetId}/softDelete`);
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
