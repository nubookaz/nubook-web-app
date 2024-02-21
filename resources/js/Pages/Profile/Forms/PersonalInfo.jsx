
import React, { useState, useEffect } from 'react';

import Address from '@/Pages/Profile/Forms/Address';
import UserName from '@/Pages/Profile/Forms/UserName';
import Phone from './Phone';
 

const PersonalInfo = ({ existingData, onUpdateInfo, emptyFields, setEmptyFields }) => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState({
      first_name: '',
      middle_initial: '',
      last_name: '',
    });
    const [address, setAddress] = useState({
      street_address: '',
      city: '',
      state: '',
      zip_code: '',
    });

    console.log(existingData);

    useEffect(() => {
      if (existingData) {
        // Directly set the state values based on existingData structure
        setPhoneNumber(existingData.tel || '');
        setName({
          first_name: existingData.first_name || '',
          middle_initial: existingData.middle_initial || '',
          last_name: existingData.last_name || '',
        });
        setAddress({
          street_address: existingData.street_address || '',
          city: existingData.city || '',
          state: existingData.state || '',
          zip_code: existingData.zip_code || '',
        });
      }
    }, [existingData]);
       
 
    // Update for the phone number
    const handlePhoneNumberChange = (newPhoneNumber) => {
      setPhoneNumber(newPhoneNumber);
      // Combine updated phone number with current name and address, then push to parent
      onUpdateInfo({ phoneNumber: newPhoneNumber, name, address });
    };

    // Update for the name
    const handleNameChange = (newName) => {
      setName(newName);
      // Combine updated name with current phone number and address, then push to parent
      onUpdateInfo({ phoneNumber, name: newName, address });
    };

    // Update for the address
    const handleAddressChange = (newAddress) => {
      setAddress(newAddress);
      // Combine updated address with current phone number and name, then push to parent
      onUpdateInfo({ phoneNumber, name, address: newAddress });
    };


  
    return (
        <div className='flex flex-col gap-4 grow'>

            <UserName 
                data={name} 
                onNameChange={handleNameChange} 
                emptyFields={emptyFields}
                setEmptyFields={setEmptyFields}
            />
                
            <Phone 
                data={phoneNumber} 
                onPhoneNumberChange={handlePhoneNumberChange} 
                emptyFields={emptyFields}
                setEmptyFields={setEmptyFields}
            />
            <Address 
                data={address} 
                onAddressChange={handleAddressChange} 
                emptyFields={emptyFields}
                setEmptyFields={setEmptyFields}
            />

        </div> 
    );
    

}

export default PersonalInfo;
