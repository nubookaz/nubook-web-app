
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

    useEffect(() => {
      if (existingData) {
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
       
    const handlePhoneNumberChange = (newPhoneNumber) => {
      setPhoneNumber(newPhoneNumber);
      onUpdateInfo({ phoneNumber: newPhoneNumber, name, address });
    };

    // Update for the name
    const handleNameChange = (newName) => {
      setName(newName);
      onUpdateInfo({ phoneNumber, name: newName, address });
    };

    const handleAddressChange = (newAddress) => {
      setAddress(newAddress);
      onUpdateInfo({ phoneNumber, name, address: newAddress });
    };


  
    return (
        <div className='flex flex-col gap-2 grow'>

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
