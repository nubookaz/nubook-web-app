import { useCallSheet } from '@/Components/Contexts/CallSheetContext';
import { useModal } from '@/Components/Contexts/ModalContext';
import { useSnack } from '@/Components/Contexts/SnackContext';

import { router } from '@inertiajs/react'; 

import React, { useState, useEffect } from 'react';

import PrimaryButton from '@/Components/Buttons/PrimaryButton'
import SecondaryButton from '@/Components/Buttons/SecondaryButton';


export default function GeneralCallTimeForm({

    data,
    callSheet,

}){
    const { updateCurrentCallSheet } = useCallSheet();
    const { toggleModal } = useModal();
    const handleCloseModal = () => {
        toggleModal(false); 
    };
    const { setSnackContent, setIsSnackOpen } = useSnack();

    const [fadeIn, setFadeIn] = useState(false);
 

    useEffect(() => {
        setFadeIn(true); 
 
    }, []);

    const [parsedHours, parsedMinutes, parsedAmPm] = data.split(/[:\s]/);

    const [hours, setHours] = useState(parsedHours);
    const [minutes, setMinutes] = useState(parsedMinutes);
    const [ampm, setAmpm] = useState(parsedAmPm);


    const saveGeneralCallTime = async () => {
        try {
            const newGeneralCallTime = `${hours}:${minutes} ${ampm}`;
            const response = await axios.put(route('projects.callSheets.update.generalCallTime', { id: callSheet.project_id, callSheetId: callSheet.id }), {
                generalCallTime: newGeneralCallTime,
            });
    
            if (response.status < 200 || response.status >= 300) {
                throw new Error('Failed to update general call time');
            }
    
            // Update the callSheet context with the new general call time
            updateCurrentCallSheet({ generalCallTime: newGeneralCallTime });
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
        <div className='flex flex-col gap-2 p-8 w-[26rem] h-full'>
            <h2 className={`text-center flex justify-center w-full text-2xl mx-auto max-w-[16rem]`}>Adjust your general call time</h2>
            
             <div className={`fade-in ${fadeIn ? 'opacity-1' : 'opacity-0'} w-full flex flex-col h-full gap-2`}>
                <div className="flex flex-row w-full gap-2 py-10 px-4">
                    <select name="hours" className="bg-slate-100 text-slate-400 w-full text-xl appearance-none outline-none" value={hours} onChange={(e) => setHours(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">10</option>
                        <option value="12">12</option>
                    </select>
                        <span className="text-2xl mx-1 my-auto font-bold">:</span>
                    <select name="minutes" className="bg-slate-100 text-slate-400 w-full text-xl appearance-none outline-none mr-4" value={minutes} onChange={(e) => setMinutes(e.target.value)}>
                        <option value="00">00</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                    </select>
                        <select name="ampm" className="bg-slate-100 text-slate-400 w-full text-xl appearance-none outline-none" value={ampm} onChange={(e) => setAmpm(e.target.value)}>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>

                <div className='w-full flex flex-row justify-center gap-6'>
                    <SecondaryButton onClick={handleCloseModal}>Cancel</SecondaryButton>
                    <PrimaryButton onClick={saveGeneralCallTime}>Submit</PrimaryButton>
                </div>
            </div>
        </div>
    );
}
