import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditableCell from './EditableCell'; // Adjust the import path as necessary
import EditableSelect from './EditableSelect'; // Adjust path as necessary
import Time from '@/Pages/Profile/Forms/Time'; // Adjust the import path as necessary
import Duration from './Duration';

const CompanyMoveRow = ({ callSheet, row, updateRowContent, deleteRow }) => {
    
    const shootLocationOptions = ["Location A", "Location B", "Location C"].map(location => ({ label: location, value: location }));
    const handleDurationChange = (newValue) => {
        updateRowContent(row.id, 6, newValue);
    };

    return (
        <>
            <td><FontAwesomeIcon icon={faBars} /></td>
            <td colSpan='3' className='text-white font-bold text-center text-md'>
                Company Move
            </td>
            <td >
                <EditableCell
                    className='!text-left !text-white placeholder:text-white'
                    placeholder='Notes...'
                    content={row.columns[1]}
                    onContentChange={(newValue) => updateRowContent(row.id, 1, newValue)}
                />
            </td>
            <td>
              <EditableSelect
                className='!text-white'
                value={row.columns[3]}
                onChange={(newValue) => updateRowContent(colIndex, newValue)}
                options={shootLocationOptions}
              />
            </td>
            <td>
                <Time
                    textColor='text-white'
                    initialTime={row.columns[3]}
                    onTimeChange={(newTime) => updateRowContent(row.id, 3, newTime)}
                />
            </td>
            <td className='flex flex-row gap-2'>
                <Duration
                    textColor='text-white'
                    duration={row.columns[4]}
                    handleDurationChange={handleDurationChange}
                />
            </td>
            <td onClick={() => deleteRow(row.id)}><FontAwesomeIcon icon={faTrash} className="cursor-pointer" /></td>
        </>
    );
};

export default CompanyMoveRow;
