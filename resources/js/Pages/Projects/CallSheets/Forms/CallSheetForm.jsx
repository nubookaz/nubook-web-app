import { useCallSheet } from '@/Components/Contexts/CallSheetContext';

import React, { useState, useEffect } from 'react';

import { router } from '@inertiajs/react';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';

import Details from '@/Pages/Projects/CallSheets/Forms/Partials/Details';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';

export default function CallSheetForm({ 

  callSheet,
  onClose,

}) {
  const { currentCallSheet, updateCurrentCallSheet } = useCallSheet();

  const [callSheetData, setCallSheetData] = useState(callSheet);

  useEffect(() => {
    // If currentCallSheet has new data and matches the id, use it
    if (currentCallSheet && currentCallSheet.id === callSheet.id) {
      setCallSheetData(currentCallSheet);
    }
  }, [currentCallSheet, callSheet]);

  const updateDetails = (field, value) => {
    setCallSheetData(prev => ({ ...prev, [field]: value }));
  };
 
  const handleSave = () => {
    const updateData = {
      id: callSheetData.id, // Include the ID to identify which record to update
      call_sheet_name: callSheetData.call_sheet_name,
      call_sheet_date_time: callSheetData.call_sheet_date_time
    };
  
    axios.post(route('projects.callSheets.update.details', { id: callSheet.project_id, callSheetId: callSheet.id }), updateData)
      .then(response => {
        console.log('Call Sheet updated:', response.data);
        
        // Update the current call sheet in the context
        updateCurrentCallSheet(response.data.callSheet);
  
        onClose(); // Close the form after successful update
      })
      .catch(error => {
        console.error('Error updating call sheet:', error);
      });
  };
 
  return (

        <div className='p-8 flex flex-col h-full w-[45rem]'>

            <div>
                <h2 className='text-center text-2xl text-slate-500'>Edit Call Sheet</h2>
                <p className="text-slate-400 text-lg text-center">
                    Edit the call sheet details below. 
                </p>
            </div>
            
            <div className='flex flex-col gap-10 py-8 h-full justify-start grow'>
                <Details
                    callSheet={callSheetData}
                    onUpdateInfo={updateDetails}
                />
            </div>

            <div className="flex flex-row justify-between mx-auto items-center w-full max-w-[25rem] gap-4 pt-10">
                <SecondaryButton
                    className='bg-slate-100 w-full'
                    onClick={onClose}
                >
                    Cancel
                </SecondaryButton>
                <PrimaryButton className='w-full' onClick={handleSave}>
                    Update Call Sheet
                </PrimaryButton>
            </div>

        </div>

  );
}
