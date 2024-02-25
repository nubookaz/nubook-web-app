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

  // Updated to handle key-value pairs
  const handleUpdateRowContent = useCallback((columnKey, newValue) => {
    updateRowContent(row.id, columnKey, newValue);
  }, [row.id, updateRowContent]);

  return (
    <>
      <td><FontAwesomeIcon icon={faBars} /></td>
      <td>
        <EditableCell
          content={row.columns.sceneNumber}
          placeholder='2,5,9'
          onContentChange={(newValue) => handleUpdateRowContent('sceneNumber', newValue)}
        />
      </td>
      <td>
        <EditableSelect
          value={row.columns.setting}
          onChange={(newValue) => handleUpdateRowContent('setting', newValue)}
          options={[{ label: "N/A", value: "N/A" }, { label: "INT", value: "INT" }, { label: "EXT", value: "EXT" }]}
        />
      </td>
      <td>
        <EditableSelect
          value={row.columns.timeOfDay}
          onChange={(newValue) => handleUpdateRowContent('timeOfDay', newValue)}
          options={timeslotOptions}
        />
      </td>
      <td className="w-full max-w-[4rem]">
        <EditableCell
          className={`!text-left`}
          content={row.columns.description}
          placeholder='Scene description'
          onContentChange={(newValue) => handleUpdateRowContent('description', newValue)}
        />
      </td>
      <td>
        <EditableSelect
          value={row.columns.shootLocation}
          className='text-xs'
          onChange={(newValue) => handleUpdateRowContent('shootLocation', newValue)}
          options={shootLocationOptions}
        />
      </td>
      <td>
        <Time
          initialTime={row.columns.startTime}
          onTimeChange={(newTime) => handleUpdateRowContent('startTime', newTime)}
        />
      </td>
      <td>
        <Duration
          duration={row.columns.duration}
          handleDurationChange={(newValue) => handleUpdateRowContent('duration', newValue)}
        />
      </td>
      <td onClick={() => deleteRow(row.id)} className='cursor-pointer'>
        <FontAwesomeIcon icon={faTrash} className="cursor-pointer" />
      </td>
    </>
  );
};

export default SceneRow;
