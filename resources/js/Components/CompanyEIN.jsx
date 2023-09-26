import React, { useState, useEffect } from 'react';
import Input from '@mui/joy/Input';

function CompanyEIN({ onEINChange, checkFormStatus }) {
  const [einNumber, setEinNumber] = useState('');

  useEffect(() => {
    checkFormStatus(); // Call the checkFormStatus function when the component mounts
  }, []); // Empty dependency array means this effect runs once on mount

  const formatEIN = (value) => {
    // Remove any non-digit characters
    const cleanedValue = value.replace(/\D/g, '');

    // Format the EIN with dashes
    const formattedValue = cleanedValue.replace(/^(\d{2})(\d{7})$/, '$1-$2');

    return formattedValue;
  };

  const handleChange = (e) => {
    let newEinNumber = e.target.value.replace(/[^0-9]/g, '');

    // Limit the input to a maximum of 10 characters
    if (newEinNumber.length > 9) {
      newEinNumber = newEinNumber.slice(0, 9);
    }

    const formattedEinNumber = formatEIN(newEinNumber);

    setEinNumber(formattedEinNumber);

    onEINChange(formattedEinNumber); // Pass the formatted EIN to the parent component
  };

  return (
    <div>
      <Input
        className="mb-4"
        placeholder="EIN Number (XX-XXXXXXX)"
        maxLength="9" // Limit input to 10 characters
        value={einNumber}
        onChange={handleChange}
      />
    </div>
  );
}

export default CompanyEIN;
