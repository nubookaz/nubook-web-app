import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
    const { userData } = useAuth();
    const [projects, setProjects] = useState([]);
    const [currentProjectId, setCurrentProjectId] = useState(null);

    // Memoize setCurrentProject to avoid unnecessary re-renders
    const setCurrentProject = useCallback((projectId) => {
        setCurrentProjectId(projectId);
        localStorage.setItem('currentProjectId', projectId); // Save to localStorage
    }, []);

    useEffect(() => {
        const storedProjectId = localStorage.getItem('currentProjectId');
        if (storedProjectId) {
            setCurrentProjectId(storedProjectId);
        }
    }, []);
 
    // Memoize fetchUserProjects to prevent function recreation on every render
    const fetchUserProjects = useCallback(async () => {
        if (!userData) return; // Exit early if userData is not available
        try {
            const response = await axios.get(route('fetch-user-projects'));  
            setProjects(response.data);
        } catch (error) {
            console.error("Failed to fetch project data:", error);
        }
    }, [userData]);

    useEffect(() => {
        fetchUserProjects();
    }, [fetchUserProjects]);

    // Memoize createProject to optimize performance
    const createProject = useCallback(async (projectData, projectAssets) => {
        const formData = new FormData();
        Object.entries({ ...projectData, ...projectAssets }).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (projectAssets.uploadedImage) {
            formData.append('uploadedImage', projectAssets.uploadedImage);
        }

        try {
            const response = await axios.post('/api/projects', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setProjects(prevProjects => [...prevProjects, response.data]);
            if (response.data?.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error('Error saving project:', error);
        }
    }, []);

    // Memoize updateProject to ensure function stability
    const updateProject = useCallback(async (projectId, updatedProject) => {
        try {
            await axios.put(`/api/projects/${projectId}`, updatedProject);
            setProjects(projects.map(project => project.id === projectId ? { ...project, ...updatedProject } : project));
        } catch (error) {
            console.error("Failed to update project:", error);
        }
    }, [projects]);

    // Memoize deleteProject to minimize re-creations
    const deleteProject = useCallback(async (projectId) => {
        try {
            await axios.delete(`/api/projects/${projectId}`);
            setProjects(projects.filter(project => project.id !== projectId));
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    }, [projects]);

    return (
        <ProjectContext.Provider value={{
            projects,
            createProject,
            updateProject,
            deleteProject,
            currentProjectId,
            setCurrentProject
        }}>
            {children}
        </ProjectContext.Provider>
    );
};
