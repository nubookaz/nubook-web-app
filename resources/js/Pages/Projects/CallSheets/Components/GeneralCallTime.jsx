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
        toggleModal({ type: 'generalCallTime', data: callTime });
    };
    const [fadeIn, setFadeIn] = useState(false);
    useEffect(() => {
        setFadeIn(true); 
 
    }, []);





    const [callTime, setCallTime] = useState('');

    function formatTime(timeString) {
        // Check if the time string is in "HH:MM AM/PM" format
        const timeRegex = /^\d{1,2}:\d{2} (AM|PM)$/i;
        if (timeRegex.test(timeString)) {
            return timeString; // The time is already in the desired format
        }
    
        // Handle ISO string format
        const date = new Date(timeString);
        if (isNaN(date.getTime())) {
            return ''; // Return empty string if the date is invalid
        }
    
        // Convert to "HH:MM AM/PM" format
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
    
        hours = hours % 12;
        hours = hours || 12; // the hour '0' should be '12'
        const formattedHours = hours.toString();
        const formattedMinutes = minutes.toString().padStart(2, '0');
    
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }
    
    useEffect(() => {
        let timeValue = '';

        // Use currentCallSheet time if available and in the correct format
        if (currentCallSheet?.call_sheet_date_time) {
            // Ensure the incoming time is formatted immediately
            timeValue = formatTime(currentCallSheet.call_sheet_date_time);
        }
        // Otherwise, use callSheet time and format it
        else if (callSheet?.call_sheet_date_time) {
            timeValue = formatTime(callSheet.call_sheet_date_time);
        }

        setCallTime(timeValue);
    }, [callSheet, currentCallSheet]);

    return (
        <CardContainer className={`${className}`} header="General Call Time" onClick={handleGeneralCallTimeClick}>
            <div className="flex flex-col gap-4">
                <h2 className={`text-2xl text-slate-500  ${fadeIn ? 'opacity-1' : 'opacity-0'}`}>{callTime}</h2>
            </div>
        </CardContainer>
    );
}
