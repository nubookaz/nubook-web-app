import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faBars } from '@fortawesome/free-solid-svg-icons';
import Time from '@/Pages/Profile/Forms/Time'; // Adjust the import path as necessary
import EditableCell from './EditableCell'; // Adjust path as necessary
import EditableSelect from './EditableSelect'; // Adjust path as necessary
import Duration from './Duration';



const SceneRow = ({ callSheet, row, updateRowContent, deleteRow }) => {

  // Convert simple string arrays to {label, value} format expected by EditableSelect
  const timeslotOptions = [{ label: "N/A", value: "N/A" }, "Day", "Night", "Afternoon", "Evening", "Morning", "Dawn", "Dusk", "Noon", "Midnight", "Twilight", "Sunset", "Sunrise"].map(option => typeof option === 'object' ? option : { label: option, value: option });
  const shootLocationOptions = ["Location A", "Location B", "Location C"].map(location => ({ label: location, value: location }));

  // Wrap the update function to prevent recreating the function on every render
  const handleUpdateRowContent = useCallback((colIndex, newValue) => {
    updateRowContent(row.id, colIndex, newValue);
  }, [row.id, updateRowContent]);

  return (
    <>
      <td><FontAwesomeIcon icon={faBars} /></td>
      {row.columns.map((col, colIndex) => (
        <td key={colIndex} className={`${colIndex === 3 ? "w-full max-w-[4rem]" : ""}`}>
          {colIndex === 0 ? (
            <EditableCell
              content={col}
              placeholder='2,5,9'
              onContentChange={(newValue) => handleUpdateRowContent(colIndex, newValue)}
            />
          ) : colIndex === 1 || colIndex === 2 ? (
            <EditableSelect
              value={col}
              onChange={(newValue) => handleUpdateRowContent(colIndex, newValue)}
              options={colIndex === 1 ? [{ label: "N/A", value: "N/A" }, { label: "INT", value: "INT" }, { label: "EXT", value: "EXT" }] : timeslotOptions}
            />
          ) : colIndex === 4 ? (
            <EditableSelect
              value={col}
              onChange={(newValue) => handleUpdateRowContent(colIndex, newValue)}
              options={shootLocationOptions}
            />
          ) : colIndex === 5 ? (
            <Time
              initialTime={col}
              onTimeChange={(newTime) => handleUpdateRowContent(colIndex, newTime)}
            />
          ) : colIndex === 6 ? (
            <Duration duration={col} handleDurationChange={handleUpdateRowContent}/>
          ) : (
            <EditableCell
              content={col}
              className='!text-left'
              placeholder='Notes....'
              onContentChange={(newValue) => handleUpdateRowContent(colIndex, newValue)}
            />
          )}
        </td>
      ))}
      <td onClick={() => deleteRow(row.id)}><FontAwesomeIcon icon={faTrash} className="cursor-pointer" /></td>
    </>
  );
};

export default SceneRow;
