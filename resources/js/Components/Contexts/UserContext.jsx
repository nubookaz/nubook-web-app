import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUsers = () => useContext(UserContext);

export const UserProvider = ({ children, project_id, callSheet_Id }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const endpoint = project_id 
                                 ? route('projects.users', {projectId: project_id})
                                 : route('call-sheets.users', {projectId: project_id, callSheet_Id: callSheet_Id});
                const response = await axios.get(endpoint);
                setUsers(response.data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        // Only fetch users if an id is provided
        if (project_id || callSheet_Id) {
            fetchUsers();
        }
    }, [project_id, callSheet_Id]);

 
return <UserContext.Provider value={{ users: users }}>
    {children}
    </UserContext.Provider>;
};
