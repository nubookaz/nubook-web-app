import React from 'react';


const EditableSelect = ({ value, options, onChange, className }) => {
  return (
    <select value={value === null ? "" : value} onChange={(e) => onChange(e.target.value)} className={` ${className} w-full border-none bg-transparent text-center`}>
      {options.map((option, index) => (
        // Using option.value as key assuming it's unique
        <option key={option.value || index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};


export default EditableSelect;
