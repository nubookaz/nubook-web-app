import React, { useState, useEffect, useRef } from 'react'; // Add useRef here
import { useProject } from '@/Components/Contexts/ProjectContext';
import { useCallSheet } from '@/Components/Contexts/CallSheetContext';
import { useModal } from '@/Components/Contexts/ModalContext';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import Input from '@/Components/Forms/Input';
import Select from '@/Components/Forms/Select';

import 'react-datepicker/dist/react-datepicker.css'; 
import { format } from 'date-fns';
import CallSheetDetailsForm from './Partials/CallSheetDetailsForm';

export default function CreateCallSheet({ roles, onClose }) {
  const { currentProjectId } = useProject();
  const { createCallSheet } = useCallSheet();
  const { toggleModal } = useModal();

  const roleRef = useRef(null);  

  const [callSheetName, setCallSheetName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
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
    const formattedDate = format(startDate, 'yyyy-MM-dd');
    const dataToSend = {
      call_sheet_name: callSheetName,
      call_sheet_date: formattedDate,
      general_call_Time: generalCallTime, // Assuming generalCallTime is in the appropriate format (e.g., 'HH:mm')
      project_id: currentProjectId,  
    };
  
    await createCallSheet(dataToSend);
  
    onClose();  
  };
  


  const [payFrequency, setPayFrequency] = useState('Day Rate');
  const [rate, setRate] = useState('');
  
  const [addSelfAsRecipient, setAddSelfAsRecipient] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [position, setPosition] = useState('');
  const [selfCallTime, setSelfCallTime] = useState('');
  
    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const handlePositionChange = (e) => {
        setPosition(e.target.value);
    };

    const handleSelfCallTimeChange = (e) => {
        setSelfCallTime(e.target.value);
    };
    
  

  
  return (

    <div className={`p-[4rem] flex flex-col gap-6 h-full w-[40rem]`}>
        <div>
            <h2 className='text-center text-2xl text-slate-500'>Create a New Call Sheet</h2>
            <p className="text-slate-400 text-lg text-center">Add details to the call sheet below </p>
        </div>

        <CallSheetDetailsForm 
            callSheetName={callSheetName}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            handleTimeChange={handleTimeChange}
            generalCallTime={generalCallTime}
            startDate={startDate}
        />

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
                            required={true} 
                        >
                            {roles.map(role => (
                                <option key={role.id} value={role.id}>{role.name}</option>
                            ))}
                        </Select>
     
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
                            min="0" 
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

        <div className="flex flex-row justify-between mx-auto items-center w-full max-w-[30rem] gap-4 pt-10">
            <SecondaryButton className='w-full' onClick={onClose}>Cancel</SecondaryButton>
            <PrimaryButton className='w-full' onClick={handleSave}>Create</PrimaryButton>
        </div>

    </div>

  );
}

