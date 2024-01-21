import { useCallSheet } from '@/Components/Contexts/CallSheetContext';
import { useModal } from '@/Components/Contexts/ModalContext';

import React, { useState, useEffect } from 'react';

import CardContainer from '@/Components/Containers/CardContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {  faCalendarDays, faClapperboard, faClock, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function ProductionDetails({ 

    project,
    callSheet, 
    className,

 }){
    const { currentCallSheet } = useCallSheet();
    const { toggleModal } = useModal();
    const handleProductionDetailsClick = () => {
        toggleModal({type: 'productionDetails'});  
    };
    
    const [callSheetName, setCallSheetName] = useState('');
    const [date, setDate] = useState('');
    const [callTime, setCallTime] = useState('');

    function formatDateWithDay(dateString) {
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function formatTime(dateString) {
        const date = new Date(dateString);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
      
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const formattedHours = hours.toString();
        const formattedMinutes = minutes.toString().padStart(2, '0');
      
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }
      
    useEffect(() => {
        const sheetToUse = currentCallSheet?.id === callSheet.id ? currentCallSheet : callSheet;

        if (sheetToUse) {
            setCallSheetName(sheetToUse.call_sheet_name);
            if (sheetToUse.call_sheet_date_time) {
                const dateValue = formatDateWithDay(sheetToUse.call_sheet_date_time);
                const timeValue = formatTime(sheetToUse.call_sheet_date_time);
                setDate(dateValue);
                setCallTime(timeValue);
            }
        }
    }, [callSheet, currentCallSheet]);

 
    return(
        <CardContainer className={`${className}`} header="Production Details" onClick={handleProductionDetailsClick} >
            <div className="flex flex-col gap-4">

                <div className='flex flex-row gap-4 text-center'>
                    <FontAwesomeIcon icon={faClapperboard} className="text-slate-400 text-2xl my-auto w-[2rem]" />
                    {/* <img className='w-[1.5rem]' src="/images/svg_images/slate.svg" alt="" /> */}
                    <h2 className='text-slate-500 text-left font-semibold text-4xl'>{project.project_name}</h2>
                </div>
                <div className="text-xl primary-color flex flex-row gap-4 font-semibold ml-8">
                    <FontAwesomeIcon icon={faPaperPlane} className="text-slate-200 my-auto w-[2rem]" />
                    <p className='text-slate-300 text-left font-semibold text-xl'>{callSheetName}</p>
                </div>
                <div className="text-xl primary-color flex flex-row gap-4 font-semibold ml-8">
                    <FontAwesomeIcon icon={faCalendarDays} className="text-slate-200 my-auto w-[2rem]" />
                    <p className='text-slate-300 text-left font-semibold text-xl'>{date}</p>
                </div>
                
            </div>
        </CardContainer>
    );
}
