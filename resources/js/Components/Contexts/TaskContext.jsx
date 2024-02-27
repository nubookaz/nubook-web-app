import { useAuth } from './AuthContext'; 

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
 

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const { user } = useAuth(); 

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        
        if(user){
            const fetchTasks = async () => {
                try {
                    const response = await axios.get(route('tasks.index'));  
                    setTasks(response.data);
                } catch (error) {
                    console.error("Failed to fetch tasks:", error);
                }
            };

            fetchTasks();
        }

    }, []);

    const addTask = async (task) => {
        try {
            const response = await axios.post(route('tasks.create'), task); 
            setTasks(prevTasks => [...prevTasks, response.data]);  
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    const removeTask = async (taskId) => {
        try {
            await axios.delete(route('tasks.delete', { taskId }));
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error("Failed to soft delete task:", error);
        }
    };
    

    return (
        <TaskContext.Provider value={{ tasks, addTask, removeTask }}>
            {children}
        </TaskContext.Provider>
    );
};
