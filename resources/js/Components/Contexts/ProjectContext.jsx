import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';  

const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]); // Adjust to manage an array of projects

    useEffect(() => {
        const fetchUserProjects = async () => {
            try {
                const response = await axios.get(route('fetch-project-data')); // Adjust URL as needed
                setProjects(response.data);
            } catch (error) {
                console.error("Failed to fetch project data:", error);
            }
        };

        fetchUserProjects();
    }, []);

    return (
        <ProjectContext.Provider value={{ projects }}>
            {children}
        </ProjectContext.Provider>
    );
};
