import { useAuth } from './AuthContext';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react'; 

const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
    const { userData } = useAuth();
    const [projects, setProjects] = useState([]);
    const [currentProjectId, setCurrentProjectId] = useState(null);
    const [currentProjectData, setCurrentProjectData] = useState(null);

    const setCurrentProject = useCallback(async (projectId) => {
        setCurrentProjectId(projectId);
        localStorage.setItem('currentProjectId', projectId);
    
        if (!projectId) {
            setCurrentProjectData(null);
            return;
        }
    
        try {
            const response = await axios.get(`/api/projects/${projectId}/details`);
            const projectData = response.data.project;
            setCurrentProjectData(projectData);
    
            if (response.data.url) {
                router.visit(response.data.url);
            }
            
        } catch (error) {
            console.error("Failed to fetch current project:", error);
            setCurrentProjectData(null);
        }
    }, []);
    
    useEffect(() => {
        const storedProjectId = localStorage.getItem('currentProjectId');
        if (storedProjectId) {
            setCurrentProjectId(storedProjectId);
        }
    }, []);

    const fetchUserProjects = useCallback(async () => {
        if (!userData) return; 
        try {
            const response = await axios.get('/api/projects/fetch-project-data');  
            setProjects(response.data);
        } catch (error) {
            console.error("Failed to fetch project data:", error);
        }
    }, [userData]);

    useEffect(() => {
        fetchUserProjects();
    }, [fetchUserProjects]);

    const createProject = useCallback(async (projectData) => {
        const formData = new FormData();
        Object.entries(projectData).forEach(([key, value]) => {
            if (value instanceof Object && !Array.isArray(value) && !(value instanceof File)) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        });
    
        try {
            const response = await axios.post('/api/projects', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const newProjectId = response.data.projectId;
            setCurrentProjectId(newProjectId);
            setProjects(prevProjects => [...prevProjects, { ...projectData, id: newProjectId }]);

            if (response.data.url) {
                router.visit(response.data.url);
            }
        } catch (error) {
            console.error('Error saving project:', error);
        }
    }, [setCurrentProjectId]);
    

    const updateProject = useCallback(async (projectId, updatedProject) => {
        try {
            await axios.put(`/api/projects/${projectId}`, updatedProject);
            setProjects(projects.map(project => project.id === projectId ? { ...project, ...updatedProject } : project));
        } catch (error) {
            console.error("Failed to update project:", error);
        }
    }, [projects]);

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
            currentProjectData,
            setCurrentProject,
        }}>
            {children}
        </ProjectContext.Provider>
    );
};
