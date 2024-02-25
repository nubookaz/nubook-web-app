import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditableCell from './EditableCell'; // Ensure correct path
import EditableSelect from './EditableSelect'; // Ensure correct path
import Time from '@/Pages/Profile/Forms/Time'; // Adjust the import path as necessary
import Duration from './Duration';

const BreakRow = ({ callSheet, row, updateRowContent, deleteRow }) => {
    const breakOptions = ["Break", "Lunch", "Dinner"].map(option => ({ label: option, value: option }));

    // Adjust the duration update function to use the correct key
    const handleUpdateRowContent = (columnKey, newValue) => {
        updateRowContent(row.id, columnKey, newValue);
    };

    return (
        <>
            <td><FontAwesomeIcon icon={faBars} /></td>
            <td colSpan="3" className='w-[35rem]'>
                <EditableSelect
                    value={row.columns.breakType} // Updated to use the correct key
                    onChange={(newValue) => handleUpdateRowContent('breakType', newValue)}
                    options={breakOptions}
                    className='font-bold !text-white text-md'
                />
            </td>
            <td colSpan="2" className='w-1/3'>
                <EditableCell
                    className='!text-left !text-white placeholder:text-white'
                    placeholder='Notes....'
                    content={row.columns.notes} // Updated to use the correct key
                    onContentChange={(newValue) => handleUpdateRowContent('notes', newValue)}
                />
            </td>
            <td className='w-[12rem]'>
                <Time
                    textColor='text-white'
                    initialTime={row.columns.startTime} // Updated to use the correct key
                    onTimeChange={(newTime) => handleUpdateRowContent('startTime', newTime)}
                />
            </td>
            <td className='w-[15rem]'>
                <Duration 
                    textColor='text-white'
                    duration={row.columns.duration} // Updated to use the correct key
                    handleDurationChange={(newValue) => handleUpdateRowContent('duration', newValue)}
                />
            </td>
            <td onClick={() => deleteRow(row.id)}><FontAwesomeIcon icon={faTrash} className="cursor-pointer" /></td>
        </>
    );
};

export default BreakRow;
