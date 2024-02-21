import { useDrawer } from '@/Components/Contexts/DrawerContext';

import React, { useState, useEffect } from 'react';

import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import CallSheetPreview from '@/Pages/Projects/CallSheets/CallSheetPreview';


export default function CallSheetActionDetails({

    project,
    callSheet,
  
}){
    
    const { drawerWidth, expandDrawer } = useDrawer(); // Assuming drawerWidth is available in the context
    const [isExpanded, setIsExpanded] = useState(false);
    const [fadeInDelay, setFadeInDelay] = useState(false);

    const [dateTimeDisplay, setDateTimeDisplay] = useState('');

    function formatTime(timeString) {
        const timeRegex = /^\d{1,2}:\d{2} (AM|PM)$/i;
        if (timeRegex.test(timeString)) {
            return timeString;
        }

        const date = new Date(timeString);
        if (isNaN(date.getTime())) {
            return '';
        }

        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours %= 12;
        hours = hours || 12;
        const formattedHours = hours.toString();
        const formattedMinutes = minutes.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    function formatDateWithDay(dateString) {
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    useEffect(() => {
 
        if (drawerWidth === 'normal') {
            setTimeout(() => {
                setIsExpanded(false);
            }, 100);  
        } else if (drawerWidth === 'wide') {
            setIsExpanded(true);
        }
    }, [drawerWidth]); 
    
    useEffect(() => {
        if (callSheet?.call_sheet_date_time) {
            const formattedTime = formatTime(callSheet.call_sheet_date_time);
            const formattedDate = formatDateWithDay(callSheet.call_sheet_date_time);
            setDateTimeDisplay(`${formattedDate} at ${formattedTime}`);
        }
    }, [callSheet]);

    const handlePreviewClick = () => {
        setIsExpanded(!isExpanded); // Toggle expanded state
    
        if (!isExpanded) {
            // Delay the drawer expansion
            setTimeout(() => {
                expandDrawer('wide');
            }, 0); // Adjust the delay as needed, 500ms as an example
        } else {
            setTimeout(() => {
                // Add your logic to shrink the drawer or reset its state
            }, 5); // Ensure the delay matches or is appropriate for your UX
        }
    };

    const handleContractClick = () => {
        setIsExpanded(false);
        // Apply any necessary delay for contracting the drawer
        setTimeout(() => {
            expandDrawer('normal'); // Assuming you have a way to reset the drawer size
        }, 5);
    };
    

    return (
        <>
            <div className='w-full text-center mb-8'>
                <h2 className='text-center text-2xl text-slate-500 mb-2'>{callSheet?.call_sheet_name}</h2>
                <span>Ready to send the call sheet to all your recipients?</span>
            </div>
          
            <div className='flex flex-row gap-10 opacity-0 animate-fadeIn h-full'>
                {!isExpanded ? (
                    <PrimaryButton onClick={handlePreviewClick} className='transition-all ease-in-out w-full h-[4rem] bg-indigo-400'>
                        Preview Call Sheet
                    </PrimaryButton>
                ) : (
                    <PrimaryButton onClick={handleContractClick} className='transition-all !duration-[50ms] ease-in-out transform w-[2.5rem] h-[4rem] !px-[.5rem] bg-indigo-400'>
                        <FontAwesomeIcon className='text-md' icon={faAngleLeft} />
                    </PrimaryButton>
                )}

                {isExpanded && (
                    <div className={`fade-in-delay w-full flex flex-row gap-10 ${fadeInDelay ? 'opacity-1' : 'opacity-0'}`}>
                        <CallSheetPreview project={project} callSheet={callSheet}/>

                        <PrimaryButton onClick={handleContractClick} className='transition-all !duration-[50ms] ease-in-out transform w-[2.5rem] h-[4rem] !px-[.5rem]'>
                            <FontAwesomeIcon className='text-md' icon={faAngleRight} />
                        </PrimaryButton>
                    </div>
                )}
            </div>
        </>
    );

}