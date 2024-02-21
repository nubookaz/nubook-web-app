import { useCallSheet } from '@/Components/Contexts/CallSheetContext';

import React, { useState, useEffect, useRef } from 'react';

import { router } from '@inertiajs/react';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';

import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import Input from '@/Components/Forms/Input';
import Select from '@/Components/Forms/Select';
import Time from '@/Pages/Profile/Forms/Time';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 


export default function CallSheetForm({ 
    
    user, 
    project, 
    roles,
    callSheet, 
    onClose, 
    mode = 'create' 

}) {

 
  const [callSheetData, setCallSheetData] = useState(callSheet || {});
  const [callSheetName, setCallSheetName] = useState(callSheet?.call_sheet_name || '');
  const [date, setDate] = useState('');
  const [payFrequency, setPayFrequency] = useState('Day Rate');
  const [rate, setRate] = useState('');

  const [generalCallTime, setGeneralCallTime] = useState('8:00 AM');
  const { currentCallSheet, updateCurrentCallSheet } = useCallSheet();
  const roleRef = useRef();

  useEffect(() => {
    if (callSheet && callSheet.call_sheet_date_time) {
      const dateTimeParts = callSheet.call_sheet_date_time.split(' ');
      const datePart = dateTimeParts[0]; // YYYY-MM-DD
      const timePart = dateTimeParts[1] + ' ' + dateTimeParts[2]; // Time and AM/PM
  
      setDate(datePart);
      setGeneralCallTime(timePart);
    }
  }, [callSheet]);
  
 

  const [addSelfAsRecipient, setAddSelfAsRecipient] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [position, setPosition] = useState('');
  const [selfCallTime, setSelfCallTime] = useState('');
  const [startDate, setStartDate] = useState(new Date());


    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const handlePositionChange = (e) => {
        setPosition(e.target.value);
    };

    const handleSelfCallTimeChange = (e) => {
        setSelfCallTime(e.target.value);
    };
    
    const handleChange = (field, value) => {
        if (field === "call_sheet_name") {
          setCallSheetName(value);
          setCallSheetData(prevState => ({ ...prevState, call_sheet_name: value }));
        }
      };
      
    const handleDateChange = (newDate) => {
        setDate(newDate);
        setCallSheetData(prevState => ({
            ...prevState,
            call_sheet_date_time: prevState.call_sheet_date_time ? `${newDate} ${prevState.call_sheet_date_time.split(' ')[1]}` : `${newDate} 00:00:00`
        }));
    };
    
    const handleTimeChange = (newTime) => {
        setGeneralCallTime(newTime);
        setCallSheetData(prevState => ({
            ...prevState,
            call_sheet_date_time: prevState.call_sheet_date_time ? `${prevState.call_sheet_date_time.split(' ')[0]} ${newTime}` : `2023-01-01 ${newTime}`
        }));
    };
      

   const handleSave = async () => {
        // Prepare the data based on the mode
        let dataToSend = {};

        if (mode === 'create') {
            // When creating, build formData from individual state values
            dataToSend = {
                call_sheet_name: callSheetName,
                call_sheet_date_time: `${date} ${generalCallTime}`,
            };

            // If adding self as a recipient, include these details
            if (addSelfAsRecipient) {
                dataToSend.selfRole = selectedRole;
                dataToSend.selfPosition = position;
                dataToSend.selfCallTime = selfCallTime;
                dataToSend.payFrequency = payFrequency; // Include the frequency of pay
                dataToSend.selfRate = rate; // Include the rate
            }
        } else {
            // When editing, use the existing callSheetData state
            // Ensure it's updated appropriately throughout the component
            dataToSend = {...callSheetData};
            // Make sure to update callSheetData on all change handlers
        }

        try {
            const endpoint = mode === 'edit'
                ? route('projects.callSheets.update', { id: project.id, callSheetId: callSheet.id })
                : route('projects.callSheets.create', { id: project.id });

            // Use Axios to send a POST request
            const response = await axios.post(endpoint, dataToSend);

            // Handle response
            if (response.status === 200) {
                if (response.data.url) {
                    window.location.href = response.data.url; // Redirect if a URL is provided
                } else {
                    onClose();
                    updateCurrentCallSheet(response.data.callSheet); 
                }
            }
        } catch (error) {
            console.error('Error saving the call sheet:', error);
            // Handle error, e.g., showing an error message to the user
        }
    };



  
  return (

    <div className={`p-[4rem] flex flex-col gap-6 h-full w-[55rem]`}>
        <div>
            <h2 className='text-center text-2xl text-slate-500'>
            {mode == 'create' ? 'Create a New Call Sheet' : 'Edit Call Sheet'}</h2>
            <p className="text-slate-400 text-lg text-center">
            {mode == 'create' ? 'Add details to the call sheet below' : 'Edit the call sheet details below'}
            </p>
        </div>

        <Input
            required
            title="Call Sheet Name"
            label="Call Sheet Name"
            type="text"
            name="call_sheet_name"
            value={callSheetName}
            placeholder="Day 1 - Scenes 1,4,5 @ Ark"
            onChange={(e) => handleChange('call_sheet_name', e.target.value)}
        />

       <div className='flex flex-row gap-6 h-full'>
            {/* <Input
                required
                title="Call Sheet Date"
                label="Call Sheet Date"
                type="date"
                name="call_sheet_date"
                value={date}
                onChange={(e) => handleDateChange(e.target.value)}
            /> */}
            <div className='w-full flex flex-col gap-2 h-full'>
                <label className='text-gray-400 text-sm'>Call Sheet Date</label>
                <div className='w-full flex h-full'>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date);
                            handleDateChange(date.toISOString().split('T')[0]); // Update the date state and callSheetData
                        }}
                        minDate={new Date()}
                        dateFormat="MMM d, yyyy"
                        // className='w-full'
                    />
                </div>
            </div>
            
            <div className='w-full flex flex-col gap-2 h-full'>
                <label className='text-gray-400 text-sm'>Call Time</label>
                <Time initialTime={currentCallSheet?.call_sheet_date_time || callSheet?.call_sheet_date_time} onTimeChange={handleTimeChange} />
            </div>
        </div>

        {mode == 'create' ? (
            <>
               <div className="flex flex-col gap-6">
                    <label className='items-center flex text-slate-400 text-sm cursor-pointer'>
                        <input
                            type="checkbox"
                            checked={addSelfAsRecipient}
                            onChange={() => setAddSelfAsRecipient(!addSelfAsRecipient)}
                            className='mr-4 rounded-sm border-slate-300'
                        /> Add myself as a recipient
                    </label>

                    {addSelfAsRecipient && (
                        <>
                            <div className='flex flex-row gap-6'>
                                <Select
                                    ref={roleRef}
                                    title="Role"
                                    label="Role"
                                    name="role"
                                    value={selectedRole}
                                    onChange={handleRoleChange}
                                    required={true} // Assuming the role selection is required
                                >
                                    {roles.map(role => (
                                        <option key={role.id} value={role.id}>{role.name}</option>
                                    ))}
                                </Select>
                                        {console.log(selectedRole)}
                                <Input
                                    label={selectedRole == '5' ? 'Position' : 'Name of Role'}
                                    value={position}
                                    onChange={handlePositionChange}
                                    placeholder={selectedRole == '5' ? 'Director, Grip, PA, etc' : 'Indiana Jones'}
                                />
                            </div>
                            <div className='flex flex-row gap-6'>
                                <Select
                                    title="Frequency"
                                    label="Frequency"
                                    name="pay_frequency"
                                    className="w-[19rem]"
                                    value={payFrequency}
                                    onChange={(e) => setPayFrequency(e.target.value)}
                                 >
                                    <option value="Day Rate">Day Rate</option>
                                    <option value="Hourly Rate">Hourly Rate</option>
                                </Select>
                                <Input
                                    label="Rate"
                                    type="number"
                                    min="0" // Ensure rate cannot be negative
                                    step="0.01"
                                    className="w-[42rem]"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    placeholder="Hourly or daily rate"
                                />

                                <Input
                                    label="Call Time"
                                    type="time"
                                    value={selfCallTime}
                                    required={true}
                                    onChange={handleSelfCallTimeChange}
                                />
                            </div>

                            
                           
                        </>
                    )}
                </div>
            </>
            
        ) : null }

        <div className="flex flex-row justify-between mx-auto items-center w-full max-w-[30rem] gap-4 pt-10">
            <SecondaryButton
                className='bg-slate-100 w-full'
                onClick={onClose}
            >
                Cancel
            </SecondaryButton>
            <PrimaryButton className='w-full' onClick={handleSave}>
                {mode == 'create' ? 'Create New Call Sheet' : 'Update Call Sheet'} 
            </PrimaryButton>
        </div>

    </div>

  );
}

