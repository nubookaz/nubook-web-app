import { useModal } from '@/Components/Contexts/ModalContext';
import { useRecipient } from '@/Components/Contexts/RecipientContext';

import React, { useState, useEffect } from 'react';

import CardContainer from '@/Components/Containers/CardContainer';
import Avatar from '@mui/joy/Avatar';
import EmptyContent from '@/Components/Layouts/EmptyContent';

export default function RecipientList({
    callSheet,
    className,
}) {
    const { toggleModal } = useModal();
    const { callSheetRecipients } = useRecipient(); // Assuming you have a setter for callSheetRecipients
    
    const handleRecipientListClick = () => {
        toggleModal({type: 'recipientForm'});  
    };

    const handleEditRecipientClick = (user) => {
         toggleModal({type: 'editRecipientForm', data: { user }});
    };

    const [recipients, setRecipients] = useState([]);
    
    useEffect(() => {
        // Filters out users with role_name 'Admin'
        const filteredRecipients = callSheet.users?.filter(user => user.pivot.role_name !== 'Admin') || [];
        setRecipients(filteredRecipients);
    }, [callSheet.users]);

    useEffect(() => {
        // Only update recipients if there's a change
        const newRecipients = callSheet.users || [];
        const currentIds = new Set(recipients.map(r => r.id));
        const newIds = new Set(newRecipients.map(user => user.id));
    
        // Check if there's any difference in the IDs
        const hasChanges = newRecipients.length !== recipients.length || 
                            [...newIds].some(id => !currentIds.has(id));
    
        if (hasChanges) {
            setRecipients(newRecipients);
        }
    }, [callSheet.users]);
    
    useEffect(() => {
        // Initialize with callSheet.users, filtering out Admins
        let initialRecipients = (callSheet.users || []).filter(user => user.pivot.role_name !== 'Admin');
    
        // Combine with callSheetRecipients, also excluding Admins and avoiding duplicates
        let combinedRecipients = [
            ...initialRecipients,
            ...callSheetRecipients.filter(recipient => 
                recipient.pivot.role_name !== 'Admin' && 
                !initialRecipients.some(r => r.id === recipient.id))
        ];
    
        // Update the recipients list with combined and potentially updated recipients
        // This step considers both new additions and updates to existing recipients
        const updatedRecipients = combinedRecipients.map(recipient => {
            const updateIndex = callSheetRecipients.findIndex(r => r.id === recipient.id && r.pivot.role_name !== 'Admin');
            // Return the update if found; otherwise, retain the original recipient
            return updateIndex !== -1 ? callSheetRecipients[updateIndex] : recipient;
        });
    
        setRecipients(updatedRecipients);
    }, [callSheet.users, callSheetRecipients]);
    
    const formatTime = (time) => {
        if (!time) return '';
        const [hours24, minutes] = time.split(':');
        const hours = parseInt(hours24, 10);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12;
        return `${hours12}:${minutes} ${ampm}`;
    };
    
    // Combine and categorize recipients directly from callSheetRecipients, no need for separate state
    const categorizedRecipients = callSheetRecipients.reduce((acc, recipient) => {
        // Exclude Admins directly here
        if (recipient.pivot.role_name === 'Admin') return acc;

        const role = recipient.pivot.role_name;
        const category = ['Client', 'Crew', 'Talent', 'Extra'].includes(role) ? role + 's' : 'Unassigned';

        if (!acc[category]) acc[category] = [];
        acc[category].push(recipient);

        return acc;
    }, {});


    const renderRecipient = (recipient, index) => (
        <div 
            key={index} 
            className='flex flex-row gap-4 items-center py-2 px-4 shadow-sm rounded-lg bg-white justify-between cursor-pointer'
            onClick={() => handleEditRecipientClick(recipient)}
        >
            <Avatar
                className='shrink'
                slotProps={{
                    root: {
                        sx: { margin: '0 !important' },
                    },
                    fallback: { sx: { color: 'red' } }
                }}
            />
            <div className='text-left text-sm font-bold flex flex-col w-full justify-start text-slate-500'>
                {`${recipient.first_name} ${recipient.last_name}`}
            </div> 
            <div className='leading-[1.15rem] text-sm w-full max-w-[4.5rem] text-left font-bold flex flex-col text-slate-500'>   
                <span className='text-xs font-normal text-slate-400'>Role</span>
                {recipient.pivot.role_name} 
            </div>
            <div className='leading-[1.15rem] text-sm w-full max-w-[5rem] text-left font-bold flex flex-col text-slate-500'>   
                <span className='text-xs font-normal text-slate-400'>Position</span>
                {recipient.position || recipient.pivot?.position}
            </div>
            <div className='leading-[1.15rem] w-full max-w-[5rem] justify-end text-right text-sm font-bold flex flex-col text-slate-500'>   
                <span className='text-xs font-normal text-slate-400'>Call Time</span>
                {formatTime(recipient.call_time || recipient.pivot?.call_time)}
            </div>
            <div className='text-emerald-500 justify-end w-full max-w-[6rem] text-right text-sm font-bold flex flex-col'>   
                Confirmed
            </div>
        </div>
    );

    return (
        <CardContainer className={`${className} ${Object.keys(categorizedRecipients).length > 0 ? 'bg-slate-300' : ''}`} header="Recipients" onClick={handleRecipientListClick}>
            <div className='h-full'>
                {Object.keys(categorizedRecipients).length > 0 ? (
                    Object.entries(categorizedRecipients).map(([category, recipients]) => (
                        <div key={category}>
                            <h3 className="text-sm font-semibold text-slate-500 mb-2">{category}</h3>
                            <div className='mb-4 flex flex-col gap-2'>
                                {recipients.map(renderRecipient)}
                            </div>
                        </div>
                    ))
                ) : (
                <EmptyContent
                    className='saturate-0'
                    imageUrl='/users.svg'
                    buttonText='Add a recipient'
                    onClick={handleRecipientListClick}
                    svgClass='max-w-[10rem]'
                >
                    {{
                        description: (
                            <p className='text-slate-300 max-w-[22rem]'>You have not added a recipient yet. Add one now!</p>
                        )
                    }}
                </EmptyContent>            )}
            </div>
        </CardContainer>
    );
    
}
