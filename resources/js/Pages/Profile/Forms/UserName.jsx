import React, { useState, useEffect } from 'react';

import Tooltip from '@mui/joy/Tooltip';



const UserName = ({ data, onNameChange, emptyFields, setEmptyFields }) => {
  const [name, setName] = useState({
    first_name: '',
    middle_initial: '',
    last_name: '',
  });

  console.log(data);

  useEffect(() => {
    if (data) {
      setName({
        first_name: data.first_name || '',
        middle_initial: data.middle_initial || '',
        last_name: data.last_name || '',
      });
    }
  }, [data]);

  const handleInputChange = (field, value) => {
    const updatedName = { ...data, [field]: value };
    onNameChange(updatedName);

    // Update emptyFields based on requirements
    if (field === 'first_name' || field === 'last_name') {
      setEmptyFields({ ...emptyFields, [field]: !value });
    }
  };

  const renderInputWithTooltip = (field, label, maxLength, autoComplete) => (
    <Tooltip 
        title={`${label} is required`} 
        open={emptyFields[field] ?? false} 
        placement="top"
    >
        <input
            type="text"
            value={data[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder={label}
            maxLength={maxLength}
            autoComplete={autoComplete}
            aria-label={label}
        />
    </Tooltip>
);

  return (

      <div className='flex flex-row gap-4'>

          <div className='flex flex-col gap-2 w-full'>
              <label htmlFor="first_name" className='text-gray-400 text-sm'>First Name *</label>
              {renderInputWithTooltip('first_name', 'First Name', undefined, 'given-name')}
          </div>
          <div className='flex flex-col gap-2'>
              <label htmlFor="middle_initial" className='text-gray-400 text-sm'>M.I.</label>
              {renderInputWithTooltip('middle_initial', 'M.I.', 1, 'additional-name')}
          </div>
          <div className='flex flex-col gap-2 w-full'>
              <label htmlFor="last_name" className='text-gray-400 text-sm'>Last Name *</label>
              {renderInputWithTooltip('last_name', 'Last Name', undefined, 'family-name')}
          </div>

      </div>

  );

};


export default UserName;
