import { useCallSheet } from '@/Components/Contexts/CallSheetContext';
import { useModal } from '@/Components/Contexts/ModalContext';

import React, { useState, useEffect } from 'react';

import CardContainer from '@/Components/Containers/CardContainer';

export default function GeneralCallTime({ 
    
    callSheet, 
    className 

}) {
    const { currentCallSheet } = useCallSheet();
    const { toggleModal } = useModal();
    const handleGeneralCallTimeClick = () => {
        toggleModal({type: 'generalCallTime', data: callTime});  
    };

    const [callTime, setCallTime] = useState('');

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
        let timeValue = '';

        // Determine which call sheet data to use
        const sheetToUse = currentCallSheet?.id === callSheet.id ? currentCallSheet : callSheet;

        if (sheetToUse?.call_sheet_date_time) {
            timeValue = formatTime(sheetToUse.call_sheet_date_time);
        }

        setCallTime(timeValue);
    }, [callSheet, currentCallSheet]);

    console.log(currentCallSheet);

    
    return (
        <CardContainer className={`${className}`} header="General Call Time" onClick={handleGeneralCallTimeClick}>
            <div className="flex flex-col gap-4">
                {callTime && (
                    <h2 className='text-4xl text-slate-500'>{callTime}</h2>
                )}
            </div>
        </CardContainer>
    );
}
