import React, { useState, useEffect } from 'react';

import Tooltip from '@mui/joy/Tooltip';




const Phone = ({ data, required, onPhoneNumberChange, emptyFields, setEmptyFields }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
 
  useEffect(() => {
    // Set phoneNumber to formatted data if provided, or reset to empty string if data is explicitly cleared
    setPhoneNumber(data ? formatPhoneNumber(data) : '');
}, [data]);


  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handleInputChange = (value) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    setPhoneNumber(formattedPhoneNumber);
    onPhoneNumberChange(formattedPhoneNumber);

    // Update emptyFields for phone number
    setEmptyFields({ ...emptyFields, phone_number: !formattedPhoneNumber });
  };

  return (
    <div className='flex flex-col gap-2 w-full'>
      <label htmlFor="phone_number" className='text-gray-400 text-sm'>Phone Number {required ? <span className='text-rose-500 ml-1'>*</span> : '' }</label>
      <Tooltip 
        title="Phone number is required" 
        open={emptyFields.phone_number ?? false}
        placement="top"
      >
        <input
          type="tel"
          required={required}
          value={phoneNumber}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="(123) 456-7890"
          autoComplete="tel"
        />
      </Tooltip>
    </div>
  );
};

export default Phone;
