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


    const [generalCallTime, setGeneralCallTime] = useState(data);
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

            updateCurrentCallSheet({ call_sheet_date_time: newGeneralCallTime });
            setTimeout(() => {
                setSnackContent('Call time was updated successfully');
                setIsSnackOpen(true);
            }, 600);
            handleCloseModal(false);
 
        } catch (error) {
            console.error(error);
        }
    };
    
    console.log(currentCallSheet);
    console.log(callSheet);

    return(
        <div className='flex flex-col gap-2 p-[3rem] w-[30rem] h-full'>
            <h2 className={`text-center text-slate-500 flex justify-center w-full text-2xl mx-auto max-w-[16rem]`}>Adjust your general call time</h2>
            
            <Time initialTime={currentCallSheet?.general_call_Time || callSheet.general_call_Time} onTimeChange={handleTimeChange} className='py-10'/>

            <div className='w-full flex flex-row justify-center gap-6'>
                <SecondaryButton onClick={handleCloseModal}>Cancel</SecondaryButton>
                <PrimaryButton onClick={saveGeneralCallTime}>Submit</PrimaryButton>
            </div>
        </div>
    );
}
