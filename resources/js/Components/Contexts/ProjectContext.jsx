import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [currentProjectId, setCurrentProjectId] = useState(null);

    const setCurrentProject = (projectId) => {
        setCurrentProjectId(projectId);
        localStorage.setItem('currentProjectId', projectId); // Save to localStorage
    };

    useEffect(() => {
        const storedProjectId = localStorage.getItem('currentProjectId');
        if (storedProjectId) {
            setCurrentProjectId(storedProjectId);
        }
    }, []);

    useEffect(() => {
        if (user) {
            const fetchUserProjects = async () => {
                try {
                    const response = await axios.get(route('fetch-project-data'));  
                    setProjects(response.data);
                } catch (error) {
                    console.error("Failed to fetch project data:", error);
                }
            };

            fetchUserProjects();
        }
    }, [user]);







    // Functions not being used
    const createProject = async (newProject) => {
        try {
            const response = await axios.post('/api/projects', newProject);
            setProjects([...projects, response.data]);
        } catch (error) {
            console.error("Failed to create project:", error);
        }
    };

    const updateProject = async (projectId, updatedProject) => {
        try {
            await axios.put(`/api/projects/${projectId}`, updatedProject);
            setProjects(projects.map(project => project.id === projectId ? {...project, ...updatedProject} : project));
        } catch (error) {
            console.error("Failed to update project:", error);
        }
    };

    const deleteProject = async (projectId) => {
        try {
            await axios.delete(`/api/projects/${projectId}`);
            setProjects(projects.filter(project => project.id !== projectId));
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    };

    

    return (
        <ProjectContext.Provider value={{ projects, createProject, updateProject, deleteProject, currentProjectId, setCurrentProject }}>
            {children}
        </ProjectContext.Provider>
    );
};
