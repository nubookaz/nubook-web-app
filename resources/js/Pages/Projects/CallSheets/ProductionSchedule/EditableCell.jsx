import React from 'react';

const EditableCell = ({ placeholder, content, onContentChange, className }) => {
  // Ensure the value prop is never null or undefined by converting such values to an empty string
  const inputValue = content != null ? content : ""; // Using != to check for both null and undefined

  return (
    <input
      type="text"
      value={inputValue} // Ensures the input is always controlled
      onChange={(e) => onContentChange(e.target.value)}
      className={`${className} w-full border-none bg-transparent p-1 text-center`}
      placeholder={placeholder}
    />
  );
};

export default EditableCell;
