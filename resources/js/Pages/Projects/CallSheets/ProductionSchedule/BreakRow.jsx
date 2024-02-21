import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditableCell from './EditableCell'; // Ensure correct path
import EditableSelect from './EditableSelect'; // Ensure correct path
import Time from '@/Pages/Profile/Forms/Time'; // Adjust the import path as necessary
import Duration from './Duration';

const BreakRow = ({ callSheet, row, updateRowContent, deleteRow }) => {
    // Ensure options are in {label, value} format
    const breakOptions = ["Break", "Lunch", "Dinner"].map(option => ({ label: option, value: option }));

    // Correctly handle updates to duration
    const handleDurationChange = (hours, minutes) => {
        updateRowContent(row.id, 6, `${hours} hours ${minutes} minutes`);
    };

    return (
        <>
            <td><FontAwesomeIcon icon={faBars} /></td>
            <td colSpan="3" className='w-[23rem]'>
                <EditableSelect
                    value={row.columns[1]}
                    onChange={(newValue) => updateRowContent(row.id, 1, newValue)}
                    options={breakOptions}
                    className='font-bold text-md'
                />
            </td>
            <td colSpan="2" className='w-[45rem]'>
              <EditableCell
                  className='!text-left'
                  placeholder='Notes....'
                  content={row.columns[2]}
                  onContentChange={(newValue) => updateRowContent(row.id, 2, newValue)}
              />
            </td>
            <td>
                {console.log(row)}
                <Time
                    initialTime={row.columns[5]}
                    onTimeChange={(newTime) => updateRowContent(row.id, 4, newTime)}
                />
            </td>
            <td className='flex flex-row gap-2'>
                <Duration row={row} handleDurationChange={handleDurationChange}/>
            </td>
            <td onClick={() => deleteRow(row.id)}><FontAwesomeIcon icon={faTrash} className="cursor-pointer" /></td>
        </>
    );
};

export default BreakRow;
