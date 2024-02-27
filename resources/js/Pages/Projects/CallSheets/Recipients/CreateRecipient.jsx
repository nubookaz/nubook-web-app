import { useCallSheet } from '@/Components/Contexts/CallSheetContext';
import { useSnack } from '@/Components/Contexts/SnackContext';
import { useRecipient } from '@/Components/Contexts/RecipientContext';

import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react'; 
import Time from '@/Pages/Profile/Forms/Time';
import Phone from '@/Pages/Profile/Forms/Phone';
import Email from '@/Pages/Profile/Forms/Email';
import Input from '@/Components/Forms/Input';
import Select from '@/Components/Forms/Select';
import UserName from '@/Pages/Profile/Forms/UserName';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';


const CreateRecipient = ({ roles, onClose }) => {
    const { createRecipient } = useRecipient(); // Use the context to access the createRecipient function

    const [formData, setFormData] = useState({
        first_name: '',
        middle_initial: '',
        last_name: '',
        email: '',
        tel: '',
        role: '',
        position: '',
        call_time: new Date(), // Adjust this as needed for your Time component
    });

    const [emptyFields, setEmptyFields] = useState([]);
    const [callTime, setCallTime] = useState('8:00 AM');

    const formatCallTime = (timeString) => {
        if (!timeString) {
            return '8:00 AM'; // Default return value or handle as appropriate
        }
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12; // Convert 24h to 12h format, 0 becomes 12
        return `${formattedHour}:${minutes} ${ampm}`;
    };
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleNameChange = (nameData) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            ...nameData
        }));
    };

    const handleEmailChange = (email) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            email
        }));
    };

    const handlePhoneNumberChange = (tel) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            tel
        }));
    };

    const handleTimeChange = (call_time) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            call_time
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform validation or any other pre-submission logic here
        await createRecipient(formData);
        onClose(); // Assuming onClose is a prop function to close the form modal/dialog
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 px-8 py-8'>
            <div className='text-center mb-6'>
                <h2 className='text-slate-400 text-2xl'>
                    Add a Recipient to your call sheet</h2>
                <p>Fill out the details below to add a recipient.</p>
            </div>
           <UserName 
                data={{
                    first_name: formData.first_name,
                    middle_initial: formData.middle_initial, // Pass middle_initial to UserName
                    last_name: formData.last_name
                }}
                onNameChange={handleNameChange}
                emptyFields={emptyFields}
                setEmptyFields={setEmptyFields}
          />

          <div className='flex flex-row gap-4 w-full'>
                <Email 
                    data={formData.email}
                    required
                    onEmailChange={handleEmailChange}
                    emptyFields={emptyFields}
                    setEmptyFields={setEmptyFields}
                />
                <Phone 
                    data={formData.tel}
                    onPhoneNumberChange={handlePhoneNumberChange}
                    emptyFields={emptyFields}
                    setEmptyFields={setEmptyFields}
                />
          </div>

          <div className='flex flex-row gap-4'>
            <Select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required 
                title="Role"
            >
                {roles.map((role) => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                ))}
            </Select>

            <Input 
                label="Position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required={true}
                title="Position"
                placeholder='Director, Grip, PA, etc'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="call_time" className='text-gray-400 text-sm'>Call Time</label>
            <Time initialTime={formatCallTime(callTime)} onTimeChange={handleTimeChange} />
          </div>
          <div className='flex flex-row gap-4 w-full mt-8 justify-center'>
                <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
                <PrimaryButton type="submit" >Submit</PrimaryButton>
          </div>
         
        </form>
      );
  };
  
  export default CreateRecipient;
 