import { useAuth } from '@/Components/Contexts/AuthContext';
import React, { useEffect, useState } from 'react';

import PageButton from '@/Components/Buttons/PageButton';
import { faDesktop, faMobileScreen, faEnvelope, faMessage, faCircleInfo, faMapLocation, faCalendarDays, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

import DrawerPanel from '@/Components/Layouts/DrawerPanel';
import CallSheetDesktopPreview from '@/Pages/Projects/CallSheets/Preview/CallSheetDesktopPreview';
import CallSheetText from '@/Components/CallSheets/CallSheetText';
import EmailTemplate from '@/Components/Emails/EmailTemplate';
import CardContainer from '@/Components/Containers/CardContainer';





export default function CallSheetPreview({data, ...props}) {
    const { user, fetchUserData } = useAuth();

    useEffect(() => {
      // Fetch user data on component mount
      fetchUserData();
   
    }, []);



    const { isDrawerPanelOpen, toggleDrawerPanel } = props;


    const [activeContent, setActiveContent] = useState('desktop-view');

    const handleButtonClick = (content) => {
      setActiveContent(content);
    };


    return (

        <DrawerPanel
            isDrawerPanelOpen={isDrawerPanelOpen}
            toggleDrawerPanel={toggleDrawerPanel}
            anchor='bottom'
            size='lg'
            showCloseButton='true'
            sxCustom={[
                {
                    '--Drawer-verticalSize': 'clamp(500px, 98%, 100%)',
                }
            ]}
        >
            {{
                header:(
                    <div>
                        <h1 className='text-center primary-color'>{data.call_sheet_name}</h1>
                    </div>
                ),
                body:(
                    <div className='call-sheet'>
                        <div className='content flex flex-row w-full justify-center gap-4'>
                            <div className='call-sheet-views flex flex-col gap-4'>
                                <PageButton onClick={() => handleButtonClick('desktop-view')} className={activeContent === 'desktop-view' ? 'active-link' : ''} icon={faDesktop} size="small" />
                                <PageButton onClick={() => handleButtonClick('mobile-view')} className={activeContent === 'mobile-view' ? 'active-link' : ''} icon={faMobileScreen} size="small" />
                                <PageButton onClick={() => handleButtonClick('email-view')} className={activeContent === 'email-view' ? 'active-link' : ''} icon={faEnvelope} size="small" />
                                <PageButton onClick={() => handleButtonClick('message-view')} className={activeContent === 'message-view' ? 'active-link' : ''} icon={faMessage} size="small" />
                            </div>
                            <div className='body'>
                            {activeContent === 'desktop-view' && (
                                <CallSheetDesktopPreview data={data}/>
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
                                <CallSheetText className='mx-auto' message="Hello, how are you?" isMine={true} >
                                <p className='text-xl'>Hey [Insert Name]!</p>
                                <p className='text-lg'>Heres the call sheet for the film: </p>
                                <p className='text-2xl mt-6'>“Girl on Wave 2”</p>
                                <p className='underline my-8 font-semibold text-3xl'>Your call time is 6:00 AM!</p>
                                <p className='text-lg'>Please confirm your availability</p>
                                <p className='text-lg'>by texting 'Confirm' or clicking this link:</p>
                                <br/>
                                <br/>[Insert Link].
                                </CallSheetText>
                            </div>
                            )}
                            </div>
                            <div className='call-sheet-anchors flex flex-col gap-4'>
                                <PageButton icon={faCircleInfo} to="/settings" size="small" />
                                <PageButton icon={faMapLocation} to="/settings" size="small" />
                                <PageButton icon={faCalendarDays} to="/settings" size="small" />
                                <PageButton icon={faPeopleGroup} to="/settings" size="small" />
                            </div>
                        </div>
                    </div>
                ),

            }}
        </DrawerPanel>

    );

}