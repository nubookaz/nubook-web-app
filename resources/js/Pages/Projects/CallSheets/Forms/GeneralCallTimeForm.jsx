import { useCallSheet } from '@/Components/Contexts/CallSheetContext';
import { useModal } from '@/Components/Contexts/ModalContext';
import { useSnack } from '@/Components/Contexts/SnackContext';

import { router } from '@inertiajs/react'; 

import React, { useState, useEffect } from 'react';

import PrimaryButton from '@/Components/Buttons/PrimaryButton'
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import Time from '@/Pages/Profile/Forms/Time';


export default function GeneralCallTimeForm({

    data,
    callSheet,

}){
    const { currentCallSheet, updateCurrentCallSheet } = useCallSheet();
    const { toggleModal } = useModal();
    const handleCloseModal = () => {
        toggleModal(false); 
    };
    const { setSnackContent, setIsSnackOpen } = useSnack();

    const [fadeIn, setFadeIn] = useState(false);
    useEffect(() => {
        setFadeIn(true); 
 
    }, []);


    const [generalCallTime, setGeneralCallTime] = useState(data); // Assuming 'data' is the initial time
    const handleTimeChange = (newTime) => {
        setGeneralCallTime(newTime);
    };

    const saveGeneralCallTime = async () => {
        try {
            const newGeneralCallTime = generalCallTime;
            const response = await axios.put(route('projects.callSheets.update.generalCallTime', { id: callSheet.project_id, callSheetId: callSheet.id }), {
                generalCallTime: newGeneralCallTime,
            });
    
            if (response.status < 200 || response.status >= 300) {
                throw new Error('Failed to update general call time');
            }
            console.log(newGeneralCallTime);

            // Update the callSheet context with the new general call time
            updateCurrentCallSheet({ call_sheet_date_time: newGeneralCallTime });
            setTimeout(() => {
                setSnackContent('Call time was updated successfully');
                setIsSnackOpen(true);
            }, 600);
            handleCloseModal(false);
 
        } catch (error) {
            console.error(error);
            // Handle the error here, for example, show an error message to the user
        }
    };
    
  
    return(
        <div className='flex flex-col gap-2 p-[3rem] w-[30rem] h-full'>
            <h2 className={`text-center text-slate-500 flex justify-center w-full text-2xl mx-auto max-w-[16rem]`}>Adjust your general call time</h2>
            
            <Time initialTime={currentCallSheet?.call_sheet_date_time || callSheet.call_sheet_date_time} onTimeChange={handleTimeChange} className='py-10'/>

            <div className='w-full flex flex-row justify-center gap-6'>
                <SecondaryButton onClick={handleCloseModal}>Cancel</SecondaryButton>
                <PrimaryButton onClick={saveGeneralCallTime}>Submit</PrimaryButton>
            </div>
        </div>
    );
}