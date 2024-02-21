import { useAuth } from '@/Components/Contexts/AuthContext';
import React, { useEffect, useState } from 'react';

import IconButton from '@/Components/Buttons/IconButton';
import { faDesktop, faMobileScreen, faEnvelope, faMessage, faCircleInfo, faMapLocation, faCalendarDays, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

import CallSheetDesktopPreview from '@/Pages/Projects/CallSheets/Preview/CallSheetDesktopPreview';
import EmailTemplate from '@/Components/Emails/EmailTemplate';
import CardContainer from '@/Components/Containers/CardContainer';





export default function CallSheetPreview({

    project,
    callSheet,

}) {
    const { user, fetchUserData } = useAuth();

    useEffect(() => {
      // Fetch user data on component mount
      fetchUserData();
   
    }, []);
    const [fadeIn, setFadeIn] = useState(false);


 
 
    const [activeContent, setActiveContent] = useState('desktop-view');

    const handleButtonClick = (content) => {
      setActiveContent(content);
    };

    const previewButtonClass = 'shadow-sm rounded-lg bg-white';

    return (

        <div className='w-full h-full'>
            <div className='content flex flex-row w-full justify-center gap-10'>
                <div className='w-full max-w-[4rem] flex flex-col gap-6'>
                    <IconButton onClick={() => handleButtonClick('desktop-view')} iconClass='text-3xl' className={`p-4 ${previewButtonClass} ${activeContent === 'desktop-view' ? 'active-link' : ''}`} icon={faDesktop} />
                    <IconButton onClick={() => handleButtonClick('mobile-view')} iconClass='text-3xl' className={`p-4 ${previewButtonClass} ${activeContent === 'mobile-view' ? 'active-link' : ''}`} icon={faMobileScreen}  />
                    <IconButton onClick={() => handleButtonClick('email-view')} iconClass='text-3xl' className={`p-4 ${previewButtonClass} ${activeContent === 'email-view' ? 'active-link' : ''}`} icon={faEnvelope}   />
                    <IconButton onClick={() => handleButtonClick('message-view')} iconClass='text-3xl' className={`p-4 ${previewButtonClass} ${activeContent === 'message-view' ? 'active-link' : ''}`} icon={faMessage}  />
                </div>
                <div className={`fade-in ${fadeIn ? 'opacity-1' : 'opacity-0'} w-full max-w-[65%]`}>
                    {activeContent === 'desktop-view' && (
                        <CallSheetDesktopPreview project={project} callSheet={callSheet}/>
                    )}
                    {activeContent === 'mobile-view' && (
                        <CardContainer className="!w-[30rem] h-full mx-auto">
                            This is a mobile
                        </CardContainer> 
                    )}
                    {activeContent === 'email-view' && (
                        <EmailTemplate />
                    )}
                    {activeContent === 'message-view' && (
                        <div className='text-center'>
                            <div className='mx-auto'>
                                <p className='text-xl'>Hey [Insert Name]!</p>
                                <p className='text-lg'>Heres the call sheet for the film: </p>
                                <p className='text-2xl mt-6'>“Girl on Wave 2”</p>
                                <p className='underline my-8 font-semibold text-3xl'>Your call time is 6:00 AM!</p>
                                <p className='text-lg'>Please confirm your availability</p>
                                <p className='text-lg'>by texting 'Confirm' or clicking this link:</p>
                                <br/>
                                <br/>[Insert Link].
                            </div>
                        </div>
                    )}
                </div>
                <div className='w-full max-w-[4rem] flex flex-col gap-6'>
                    <IconButton iconClass='text-3xl' className={`p-4 ${previewButtonClass}`} icon={faCircleInfo}   />
                    <IconButton iconClass='text-3xl' className={`p-4 ${previewButtonClass}`} icon={faMapLocation}   />
                    <IconButton iconClass='text-3xl' className={`p-4 ${previewButtonClass}`} icon={faCalendarDays}  />
                    <IconButton iconClass='text-3xl' className={`p-4 ${previewButtonClass}`} icon={faPeopleGroup} />
                </div>
            </div>
        </div>

    );

}