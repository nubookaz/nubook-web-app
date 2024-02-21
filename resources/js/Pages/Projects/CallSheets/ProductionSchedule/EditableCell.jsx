import React from 'react';

const EditableCell = ({ placeholder, content, onContentChange, className }) => {
  return (
    <input
      type="text"
      value={content}
      onChange={(e) => onContentChange(e.target.value)}
      className={`${className} w-full border-none bg-transparent p-1 text-center`}
      placeholder={placeholder}
    />
  );
};

export default EditableCell;
