import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(route('tasks.index')); // Update with your actual API endpoint
                setTasks(response.data);
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    const addTask = async (task) => {
        try {
            const response = await axios.post(route('tasks.create'), task); // Add task through API
            setTasks(prevTasks => [...prevTasks, response.data]); // Add the new task returned by the API to the state
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    const removeTask = async (taskId) => {
        try {
            await axios.delete(route('tasks.delete', {taskId} ) ); // Delete task through API
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId)); // Remove the task from the state
        } catch (error) {
            console.error("Failed to remove task:", error);
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, removeTask }}>
            {children}
        </TaskContext.Provider>
    );
};
