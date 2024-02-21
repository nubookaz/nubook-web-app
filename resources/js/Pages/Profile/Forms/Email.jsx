import React, { useState, useEffect } from 'react';
import Tooltip from '@mui/joy/Tooltip';

const Email = ({ data, required, onEmailChange, emptyFields, setEmptyFields }) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  
  useEffect(() => {
    // Set email to data if provided, or reset to empty string if data is explicitly cleared
    setEmail(data || '');
}, [data]);


  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (value) => {
    const isEmailValid = validateEmail(value);
    setEmail(value);
    setIsValid(isEmailValid);

    // Ensure the emptyFields state is initialized properly to avoid switching from uncontrolled to controlled
    if (emptyFields.email === undefined) {
      setEmptyFields({ ...emptyFields, email: false }); // Initialize explicitly as false
    } else {
      // Update emptyFields for email based on current input
      setEmptyFields({ ...emptyFields, email: !value || !isEmailValid });
    }

    if (isEmailValid) {
      onEmailChange(value);
    }
  };

  const shouldShowTooltip = emptyFields.email !== undefined ? emptyFields.email : false;

  return (
    <div className='flex flex-col gap-2 w-full'>
      <label htmlFor="email" className='text-gray-400 text-sm'>Email Address {required ? <span className='text-rose-500 ml-1'>*</span> : '' }</label>
      <Tooltip 
        title={!isValid ? "Invalid email format" : "Email is required"} 
        open={shouldShowTooltip} 
        placement="right"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="example@email.com"
          className={!isValid ? 'border-red-500' : ''}
          required={required}
        />
      </Tooltip>
      {!isValid && <p className='text-red-500 text-xs'>Invalid email format</p>}
    </div>
  );
};

export default Email;
