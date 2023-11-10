import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

function CompanyEIN({ onEINChange, checkFormStatus, required, existingData }) {

  const { data, setData } = useForm({
    ein_number: '',
  });


  useEffect(() => {
    if (existingData) {
      setData(existingData);
    }
  }, [existingData]);

  useEffect(() => {
    if (checkFormStatus) {
      checkFormStatus();  
    }  
  }, []); 


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

    // Update the parent component with the formatted EIN
    onEINChange('ein_number', formattedEinNumber);
  };

  return (
    <div>
      <input
        type="text"
        name="ein_number"
        placeholder=" XX-XXXXXXX"
        maxLength="9" // Limit input to 10 characters
        value={data.ein_number}
        onChange={handleChange} 
        required={required}
      />
    </div>
  );
}

export default CompanyEIN;
