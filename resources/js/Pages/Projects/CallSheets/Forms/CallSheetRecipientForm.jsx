import { useCallSheet } from '@/Components/Contexts/CallSheetContext';
import { useSnack } from '@/Components/Contexts/SnackContext';

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


const CallSheetRecipientForm = ({

    project,
    callSheet,
    recipient, 
    roles,
    onClose,

}) => {
    const { addRecipientToCallSheet, removeRecipientFromCallSheet } = useCallSheet();
    const { setSnackContent, setIsSnackOpen } = useSnack();

    const initialFormState = {
        first_name: '',
        middle_initial: '',
        last_name: '',
        email: '',
        tel: '',
        position: '',
        role: '',
    };

    const [formData, setFormData] = useState(initialFormState);
    const [emptyFields, setEmptyFields] = useState({
        phone_number: false,
        first_name: false,
        middle_initial: false,  
        last_name: false,
    });

    useEffect(() => {
        if (recipient) {
            // Find the role object that matches the recipient's role name
            const matchingRole = roles.find(role => role.name === recipient.user.pivot.role_name);
            const newFormData = {
                first_name: recipient.user.first_name || '',
                middle_initial: recipient.user.middle_initial || '',
                last_name: recipient.user.last_name || '',
                email: recipient.user.email || '',
                tel: recipient.user.phone ? recipient.user.phone.tel : '',
                position: recipient.user.pivot ? recipient.user.pivot.position : '',
                role: matchingRole ? matchingRole.id : '', // Use the found role's ID
            };
            setFormData(newFormData);
        } else {
            setFormData(initialFormState);
        }
    }, [recipient, roles]);
    

    // State for managing time separately
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
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle changes from the UserName component
    const handleNameChange = (updatedName) => {
        setFormData(prevState => ({
            ...prevState,
            ...updatedName
        }));
    };
    

    // Handle phone number changes from the Phone component
    const handlePhoneNumberChange = (phoneNumber) => {
        setFormData(prevState => ({
            ...prevState,
            tel: phoneNumber
        }));
    };

    const handleEmailChange = (email) => {
        setFormData(prevState => ({
            ...prevState,
            email: email
        }));
    };

    // Handler for updating callTime from Time component
    const handleTimeChange = (newTime) => {
        setCallTime(newTime);
    };
    
    const handleSave = async () => {
        try {
            let endpoint;
            if (recipient) {
                endpoint = route('projects.callSheets.update.recipient', { id: project.id, callSheetId: callSheet.id, recipientId: recipient.user.id });
            } else {
                endpoint = route('projects.callSheets.recipient', { id: project.id, callSheetId: callSheet.id });
            }
    
            const submissionData = { ...formData, call_time: callTime };
            console.log('submissionData:', submissionData);

            const response = await axios.post(endpoint, submissionData, {
                headers: { 'Content-Type': 'application/json' },
            });
    
            console.log('Success:', response.data);
    
            // Reset form fields to initial state after successful submission
            setFormData(initialFormState);
            setCallTime('8:00 AM'); // Reset call time to default or initial value
            setEmptyFields({ phone_number: false }); // Reset any state related to empty fields if applicable

            setTimeout(() => {
                if (recipient) {
                    setSnackContent('Receipient updated successfully!');
                } else {
                    setSnackContent('Receipient added successfully!');
                }
                    setIsSnackOpen(true);
            }, 600);



            // After resetting the state, you can call onClose or update UI accordingly
            onClose();
            console.log('addRecipientToCallSheet:', callSheet.id, response.data);

            addRecipientToCallSheet(callSheet.id, response.data);
        } catch (error) {
            console.error('Error during save:', error.response || error.message);
            // Handle the error, e.g., show an error message to the user
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave();
    };
    
    const handleDelete = async () => {
        if (!recipient) return; // Safety check
        const confirmDelete = window.confirm("Are you sure you want to remove this recipient from the call sheet?");
        if (!confirmDelete) return;
        const recipientId = recipient.user.id; // Adjust based on your data structure

        try {
            const endpoint = route('projects.callSheets.delete.recipient', {
                id: project.id,
                callSheetId: callSheet.id,
                recipientId: recipient.user.id,
            });

            await axios.delete(endpoint);
            removeRecipientFromCallSheet(recipientId);
            console.log('Recipient removed successfully from the call sheet');

            // After deletion, perform any necessary state updates or UI refreshes
            onClose(); // Assuming onClose will refresh the recipient list or close the modal/form
            
            // Optionally, trigger any global state updates to reflect the deletion
            // This could be a context method or an event emission, depending on your state management
        } catch (error) {
            console.error('Error during deletion:', error.response || error.message);
        }
    };

    
   
    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 px-8 py-8'>
            <div className='text-center mb-6'>
                <h2 className='text-slate-400 text-2xl'>
                    {recipient ? 'Edit Recipient': 'Add a Recipient to your call sheet'}</h2>
                <p>Fill out the details below to {recipient ? 'edit' : 'add'} a recipient.</p>
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
            <Time initialTime={formatCallTime(recipient?.user.pivot.call_time) || callTime} onTimeChange={handleTimeChange} />
          </div>
          <div className='flex flex-row gap-4 w-full mt-8 justify-center'>
                {recipient && (
                    <button
                        type="button"
                        className="bg-slate-50 hover:bg-red-700 text-rose-200 hover:text-white duration-500 transition-all font-bold py-2 px-4 rounded"
                        onClick={handleDelete}
                    >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </button>
                )}
                <SecondaryButton>Cancel</SecondaryButton>
                <PrimaryButton type="submit" >Submit</PrimaryButton>
          </div>
         
        </form>
      );
  };
  
  export default CallSheetRecipientForm;