import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { router } from '@inertiajs/react'; 

const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
    const { userData } = useAuth();
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
 
    const fetchUserProjects = async () => {
        try {
            const response = await axios.get(route('fetch-user-projects'));  
            setProjects(response.data);
        } catch (error) {
            console.error("Failed to fetch project data:", error);
        }
    };

    useEffect(() => {
        if (userData) {
            fetchUserProjects();
        }
    }, [userData]);



    const createProject = async (projectData, projectAssets) => {
        const formData = new FormData();
        Object.entries({ ...projectData, ...projectAssets }).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // Assuming projectAssets may contain isImageAIGenerated, uploadedImage, and posterSize
        if (projectAssets.uploadedImage) {
            formData.append('uploadedImage', projectAssets.uploadedImage);
        }

        try {
            const response = await axios.post('/api/projects', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setProjects([...projects, response.data]);

            // Navigate to the new project's detail page or handle success response
            if (response.data?.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error('Error saving project:', error);
            // Handle error
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
