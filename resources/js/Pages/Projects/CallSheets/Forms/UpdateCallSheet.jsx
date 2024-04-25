import React, { useState, useEffect } from 'react';
import { useProject } from '@/Components/Contexts/ProjectContext';
import { useCallSheet } from '@/Components/Contexts/CallSheetContext';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
 
import 'react-datepicker/dist/react-datepicker.css'; 
import axios from 'axios';
import { format } from 'date-fns';
import CallSheetDetailsForm from './Partials/CallSheetDetailsForm';

export default function UpdateCallSheet({ data, onClose }) {
    const { updateCallSheet } = useCallSheet();

    const [callSheetName, setCallSheetName] = useState(data?.call_sheet_name || '');
    const [startDate, setStartDate] = useState(data?.call_sheet_date_time ? new Date(data.call_sheet_date_time) : new Date());
    const [generalCallTime, setGeneralCallTime] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
        case 'call_sheet_name':
            setCallSheetName(value);
            break;
        default:
            break;
        }
    };

    const handleDateChange = (date) => {
        setStartDate(date);
    };

    const handleTimeChange = (time) => {
        setGeneralCallTime(time);
    };

    const handleSave = async () => {
        const formattedDate = format(startDate, 'yyyy-MM-dd') + ' ' + generalCallTime;
        const dataToSend = {
        call_sheet_name: callSheetName,
        call_sheet_date_time: formattedDate,
        };

        await updateCallSheet(data.id, dataToSend);
        onClose();  
    };
  
  return (

    <div className={`p-[4rem] flex flex-col gap-6 h-full w-[55rem]`}>
        <div>
            <h2 className='text-center text-2xl text-slate-500'>Update Call Sheet</h2>
            <p className="text-slate-400 text-lg text-center">Edit the details of the call sheet below</p>
        </div>

        <CallSheetDetailsForm 
            callSheetName={callSheetName}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            handleTimeChange={handleTimeChange}
            generalCallTime={generalCallTime}
            startDate={startDate}
        />

        <div className="flex flex-row justify-between mx-auto items-center w-full max-w-[30rem] gap-4 pt-10">
            <SecondaryButton className='w-full' onClick={onClose}>Cancel</SecondaryButton>
            <PrimaryButton className='w-full' onClick={handleSave}>Update</PrimaryButton>
        </div>

    </div>

  );
}

