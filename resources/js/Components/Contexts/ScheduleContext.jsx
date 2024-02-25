import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProject } from './ProjectContext'; 


const ScheduleContext = createContext();

export const useSchedule = () => useContext(ScheduleContext);

export const ScheduleProvider = ({ children, initialData }) => {
  const { projects } = useProject(); 

  const [rows, setRows] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const selectProjectById = (projectId) => {
      setSelectedProjectId(projectId);
  };

  useEffect(() => {
    // When selectedProjectId updates, find the project and parse its schedule
    const selectedProject = projects.find(project => project.id === selectedProjectId);
    if (selectedProject && selectedProject.production_schedules && selectedProject.production_schedules.length > 0) {
        // Assuming the first production_schedule contains the relevant schedule data as a JSON string
        const scheduleData = JSON.parse(selectedProject.production_schedules[0].schedule);
        setRows(scheduleData); // Update rows based on parsed schedule data
    } else {
        setRows([]); // Reset rows if no matching project or schedule data
    }
}, [selectedProjectId, projects]);

    const addRow = (type) => {
        const newRowId = `row-${rows.length + 1}`;
        let newRow = {
            id: newRowId,
            type: type,
            columns: {} // Default empty columns, specific columns are determined by row type
        };

        switch (type) {
            case 'Scene':
                newRow.columns = {
                    sceneNumber: "",
                    setting: "N/A",
                    timeOfDay: "N/A",
                    description: "",
                    shootLocation: "Location A",
                    startTime: "08:00 AM",
                    duration: "0 hours 0 minutes",
                };
                break;
            case 'Break':
                newRow.columns = {
                    breakType: "Break",
                    notes: "",
                    startTime: "08:00 AM",
                    duration: "0 hours 0 minutes",
                };
                break;
            case 'Company Move':
                newRow.columns = {
                    description: "",
                    shootLocation: "Location A",
                    startTime: "08:00 AM",
                    duration: "0 hours 0 minutes",
                };
                break;
            // Add more cases as needed for different row types
        }

        setRows(currentRows => [...currentRows, newRow]);
    };

    const deleteRow = (rowId) => {
        setRows(currentRows => currentRows.filter(row => row.id !== rowId));
    };

    const updateRowContent = (rowId, columnKey, newValue) => {
      setRows(currentRows =>
          currentRows.map(row =>
              row.id === rowId ? { ...row, columns: { ...row.columns, [columnKey]: newValue } } : row
          )
      );
    };

    const reorderRows = (startIndex, endIndex) => {
      setRows(currentRows => {
          const result = Array.from(currentRows);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          return result;
      });
  };

    return (
      <ScheduleContext.Provider value={{ rows, addRow, deleteRow, updateRowContent, reorderRows, selectProjectById }}>
        {children}
      </ScheduleContext.Provider>
    );
};
