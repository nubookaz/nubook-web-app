import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SceneRow from './SceneRow';
import BreakRow from './BreakRow'; // Ensure this path matches where you saved BreakRow
import CompanyMoveRow from './CompanyMoveRow'; // Ensure this path matches where you saved BreakRow

import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import AddButton from './AddButton';

const CallSheetProductionSchedule = ({ project, callSheet }) => {

    const initialRows = project.production_schedules && project.production_schedules.length > 0
        ? JSON.parse(project.production_schedules[0].schedule).map((row, index) => ({
            ...row,
            id: `row-${index}` // Generate a unique ID for each row
        }))
    : [];


    const [rows, setRows] = useState(initialRows);
    const [saveTimeoutId, setSaveTimeoutId] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };
 
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const items = reorder(rows, result.source.index, result.destination.index);
        setRows(items);
    };

    const addRow = (type) => {
        let newRow;
        switch (type) {
            case 'Scene':
                newRow = {
                    id: `row-${rows.length + 1}`,
                    type,
                    columns: {
                        sceneNumber: "",
                        setting: "N/A",
                        timeOfDay: "N/A",
                        description: "",
                        shootLocation: "Location A",
                        startTime: "08:00 AM",
                        duration: "0 hours 0 minutes",
                    },
                };
                break;
            case 'Break':
                newRow = {
                    id: `row-${rows.length + 1}`,
                    type,
                    columns: {
                        breakType: "Break", // Assigning a specific type of break (e.g., Lunch, Dinner)
                        notes: "", // Placeholder for any notes related to the break
                        startTime: "08:00 AM", // The time when the break starts
                        duration: "0 hours 0 minutes", // The expected duration of the break
                    },
                };
                break;
            case 'Company Move':
                newRow = {
                    id: `row-${rows.length + 1}`,
                    type,
                    columns: {
                        description: "", // Description or notes for the company move
                        shootLocation: "Location A", // The new location to which the company is moving
                        startTime: "08:00 AM", // The time when the move starts
                        duration: "0 hours 0 minutes", // The expected duration of the move
                    },
                };
                break;
            default:
                newRow = {
                    id: `row-${rows.length + 1}`,
                    type,
                    columns: {},
                };
                break;
        }
        setRows([...rows, newRow]);
    };
    

    const getRowBackgroundColor = (type) => {
        switch (type) {
            case 'Scene':
                return '!bg-slate-50'; // white for Scene
            case 'Break':
                return '!bg-amber-500'; // light blue for Break
            case 'Company Move':
                return '!bg-slate-500'; // light green for Company Move
            default:
                return 'bg-white'; // Default background color
        }
    };    
    
    const deleteRow = (rowId) => {
        setRows(rows.filter(row => row.id !== rowId));
    };

    const updateRowContent = (rowId, columnKey, newValue) => {
        setRows(currentRows =>
            currentRows.map(row =>
                row.id === rowId ? { ...row, columns: { ...row.columns, [columnKey]: newValue } } : row
            )
        );
    };
    
    const scheduleSave = () => {
        if (saveTimeoutId) clearTimeout(saveTimeoutId);
        const newSaveTimeoutId = setTimeout(() => {
            saveRows(); // Call the save function after the delay
        }, 2000); // Delay in milliseconds (e.g., 2000ms = 2 seconds)
        setSaveTimeoutId(newSaveTimeoutId);
    };

    const saveRows = async () => {
        setIsSaving(true);
        const scheduleData = rows.map(row => ({
            type: row.type,
            columns: row.columns,
        }));
    
        try {
            const response = await axios.post(route('callSheets.schedule.store', {id: callSheet.project_id, callSheetId: callSheet.id}), {
                schedule: scheduleData,
            });
    
            console.log('Schedule saved successfully:', response.data);
        } catch (error) {
            console.error("Error saving schedule:", error.response || error);
        } finally {
            setIsSaving(false);
        }
    };
    
    useEffect(() => {
        if (rows.length > 0) {
            scheduleSave();
        }
        // Clean up on unmount
        return () => {
            if (saveTimeoutId) clearTimeout(saveTimeoutId);
        };
    }, [rows]);

    if (rows.length === 0) {
        return (
            <div className="text-xcenter flex flex-col gap-8 justify-center items-center h-full ">
                <img src="/images/svg_images/undraw_movie_night.svg" alt="No rows" className="max-w-[25%] opacity-[25%] my-5" />
                <PrimaryButton onClick={() => addRow('Scene')} className="p-2 bg-blue-500 text-white rounded">Add a Scene Now</PrimaryButton>
            </div>
        );
    }

    return (
        <div className='w-full h-full px-10 py-10 relative'>
            <div className='w-full flex flex-col gap-2 items-center justify-center mb-6'>
                <h3 className='text-xl font-bold text-slate-500'>Call Sheet: {callSheet.call_sheet_name}</h3>
                <p className='text-lg'>Production Schedule</p>
            </div>
 
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div className='table-scrollable-container'>
                            <table id='production-schedule-form' {...provided.droppableProps} ref={provided.innerRef} className="w-full table-fixed">
                                <thead className='bg-slate-100'>
                                    <tr>
                                        <th className="w-[4rem]"></th>
                                        <th className="w-[6rem]">Scene #</th>
                                        <th className='w-[7rem]'>Setting</th>
                                        <th className='w-[10rem]'>Timeslot</th>
                                        <th className="w-1/3 text-left">Scene Description</th>
                                        <th className='w-[20rem]'>Shoot Location</th>
                                        <th className='w-[12rem]'>Start Time</th>
                                        <th className='w-[15rem]'>Duration</th>
                                        <th className="w-[4rem]"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {rows.map((row, index) => (
                                    <Draggable key={row.id} draggableId={row.id.toString()} index={index}>
                                        {(provided, snapshot) => {
                                        const dynamicBackgroundColor = getRowBackgroundColor(row.type);
                                        return (
                                            <tr
                                            {...provided.draggableProps}
                                            ref={provided.innerRef}
                                            {...provided.dragHandleProps}
                                            className={`${dynamicBackgroundColor} ${snapshot.isDragging ? 'dragging-row' : ''}`}
                                            style={{
                                                ...provided.draggableProps.style,
                                                backgroundColor: snapshot.isDragging ? dynamicBackgroundColor : '',
                                            }}
                                            >
                                            {row.type === 'Scene' ? (
                                                <SceneRow row={row} callSheet={callSheet} updateRowContent={updateRowContent} deleteRow={deleteRow} />
                                            ) : row.type === 'Break' ? (
                                                <BreakRow row={row} callSheet={callSheet} updateRowContent={updateRowContent} deleteRow={deleteRow} />
                                            ) : row.type === 'Company Move' ? (
                                                <CompanyMoveRow row={row} callSheet={callSheet} updateRowContent={updateRowContent} deleteRow={deleteRow} />
                                            ) : null}
                                            </tr>
                                        );
                                        }}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                </tbody>
                            </table>
                        </div>
                        
                    )}
                </Droppable>
            </DragDropContext>

            <div className={`flex flex-row px-8 absolute w-full bottom-0 left-0 py-6 bg-white shadow-[15px_0px_20px_-15px_rgba(0,0,0,0.3)]`}>
                <AddButton
                    addScene={() => addRow('Scene')}
                    addBreak={() => addRow('Break')}
                    addCompanyMove={() => addRow('Company Move')}
                />
                <PrimaryButton className={`text-white`}>Done</PrimaryButton>
            </div>

            
        </div>
    );
};

export default CallSheetProductionSchedule;
