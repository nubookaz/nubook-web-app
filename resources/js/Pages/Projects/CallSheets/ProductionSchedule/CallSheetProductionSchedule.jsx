import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SceneRow from './SceneRow';
import BreakRow from './BreakRow'; // Ensure this path matches where you saved BreakRow
import CompanyMoveRow from './CompanyMoveRow'; // Ensure this path matches where you saved BreakRow

import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import AddButton from './AddButton';

const CallSheetProductionSchedule = ({ callSheet }) => {
    const [rows, setRows] = useState([]);

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
        let columns;
        switch (type) {
            case 'Scene':
                columns = ["", "N/A", "N/A", "", "Location A", "08:00 AM", "0 hours 0 minutes"];
                break;
            case 'Break':
                columns = ["", "Break", "", "", "", "08:00 AM", "0 hours 0 minutes"];
                break;
            case 'Company Move':
                columns = ["", "", "", "", "", "08:00 AM", "0 hours 0 minutes"];
                break;
            default:
                columns = ["", "", "", "", "", "", ""];
                break;
        }
    
        const newRow = {
            id: `${rows.length + 1}`,
            type,
            columns,
        };
        setRows([...rows, newRow]);
    };

    const getRowBackgroundColor = (type) => {
        switch (type) {
            case 'Scene':
                return 'bg-white'; // white for Scene
            case 'Break':
                return 'bg-amber-500'; // light blue for Break
            case 'Company Move':
                return 'bg-slate-500'; // light green for Company Move
            default:
                return 'bg-white'; // Default background color
        }
    };    
    
    const deleteRow = (rowId) => {
        setRows(rows.filter(row => row.id !== rowId));
    };

    const updateRowContent = (rowId, columnIndex, newValue) => {
        setRows(currentRows =>
            currentRows.map(row =>
                row.id === rowId ? { ...row, columns: row.columns.map((col, idx) => idx === columnIndex ? newValue : col) } : row
            )
        );
    };

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
            <div className='w-full flex flex-col gap-2 items-center justify-center '>
                <h3 className='text-xl font-bold text-slate-500'>Call Sheet: {callSheet.call_sheet_name}</h3>
                <p className='text-lg'>Production Schedule</p>
            </div>
 
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div className='table-scrollable-container'>
                            <table id='production-schedule' {...provided.droppableProps} ref={provided.innerRef} className="w-full table-fixed">
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
                                    <Draggable key={row.id} draggableId={row.id} index={index}>
                                        {(provided, snapshot) => (
                                            <tr
                                                {...provided.draggableProps}
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                className={`${snapshot.isDragging ? 'dragging-row' : ''} ${getRowBackgroundColor(row.type)}`} // Add the dynamic background color class here
                                                style={snapshot.isDragging ? {...provided.draggableProps.style, width: "inherit", margin: "0"} : {}}

                                            >
                                                {row.type === 'Scene' ? (
                                                    <SceneRow row={row} callSheet={callSheet} updateRowContent={updateRowContent} deleteRow={deleteRow} />
                                                ) : row.type === 'Break' ? (
                                                    <BreakRow row={row} callSheet={callSheet} updateRowContent={updateRowContent} deleteRow={deleteRow} />
                                                ) : row.type === 'Company Move' ? (
                                                    <CompanyMoveRow row={row} callSheet={callSheet} updateRowContent={updateRowContent} deleteRow={deleteRow} />
                                                ) : null}
                                            </tr>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                </tbody>
                            </table>
                        </div>
                        
                    )}
                </Droppable>
            </DragDropContext>

            <AddButton
                className={`absolute w-full bottom-0 left-0 py-6 bg-white shadow-[15px_0px_20px_-15px_rgba(0,0,0,0.3)]`}
                addScene={() => addRow('Scene')}
                addBreak={() => addRow('Break')}
                addCompanyMove={() => addRow('Company Move')}
            />

        </div>
    );
};

export default CallSheetProductionSchedule;
