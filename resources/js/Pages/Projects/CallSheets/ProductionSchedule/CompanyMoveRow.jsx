import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditableCell from './EditableCell'; // Adjust the import path as necessary
import EditableSelect from './EditableSelect'; // Adjust path as necessary
import Time from '@/Pages/Profile/Forms/Time'; // Adjust the import path as necessary
import Duration from './Duration';

const CompanyMoveRow = ({ callSheet, row, updateRowContent, deleteRow }) => {
    const shootLocationOptions = ["Location A", "Location B", "Location C"].map(location => ({ label: location, value: location }));

    // Correctly handling updates using column keys
    const handleUpdateRowContent = (columnKey, newValue) => {
        updateRowContent(row.id, columnKey, newValue);
    };

    return (
        <>
            <td><FontAwesomeIcon icon={faBars} /></td>
            <td colSpan='3' className='w-[35rem] text-white font-bold text-center text-md'>Company Move</td>
            <td className='w-1/3'>
                <EditableCell
                    className='!text-left !text-white placeholder:text-white'
                    placeholder='Notes...'
                    content={row.columns.description} // Updated to use the correct key
                    onContentChange={(newValue) => handleUpdateRowContent('description', newValue)}
                />
            </td>
            <td className='w-[8rem]'>
                <EditableSelect
                    className='!text-white'
                    value={row.columns.shootLocation} // Updated to use the correct key
                    onChange={(newValue) => handleUpdateRowContent('shootLocation', newValue)}
                    options={shootLocationOptions}
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

export default CompanyMoveRow;
