import React, { useState } from 'react';
import { faDesktop, faMobileScreen, faEnvelope, faMessage, faCircleInfo, faMapLocation, faCalendarDays, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import PageButton from '@/Components/Buttons/PageButton';
import CallSheetDesktop from '@/Components/CallSheets/CallSheetDesktop';

import CardContainer from '@/Components/Containers/CardContainer';
import EmailTemplate from '@/Components/Emails/EmailTemplate';
import CallSheetText from '@/Components/CallSheets/CallSheetText';

function CallSheetPreview() {

  const [activeContent, setActiveContent] = useState('desktop-view');

  const handleButtonClick = (content) => {
    setActiveContent(content);
  };
  return (
    <div className='call-sheet'>
      <h1 className='text-center mb-4 secondary-color'>Call Sheet Name</h1>
      <div className='content flex flex-row w-full justify-center gap-4'>
        <div className='call-sheet-views'>
          <ul>
            <li>
              <PageButton onClick={() => handleButtonClick('desktop-view')} className={activeContent === 'desktop-view' ? 'active-link' : ''} icon={faDesktop} size="small" />
            </li>
            <li>
              <PageButton onClick={() => handleButtonClick('mobile-view')} className={activeContent === 'mobile-view' ? 'active-link' : ''} icon={faMobileScreen} size="small" />
            </li>
            <li>
              <PageButton onClick={() => handleButtonClick('email-view')} className={activeContent === 'email-view' ? 'active-link' : ''} icon={faEnvelope} size="small" />
            </li>
            <li>
              <PageButton onClick={() => handleButtonClick('message-view')} className={activeContent === 'message-view' ? 'active-link' : ''} icon={faMessage} size="small" />
            </li>
          </ul>
        </div>
        <div className='body'>
          {activeContent === 'desktop-view' && (
            <CallSheetDesktop>
            </CallSheetDesktop>
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
        <div className='call-sheet-anchors'>
          <ul>
            <li>
              <PageButton icon={faCircleInfo} to="/settings" size="small" />
            </li>
            <li>
              <PageButton icon={faMapLocation} to="/settings" size="small" />
            </li>
            <li>
              <PageButton icon={faCalendarDays} to="/settings" size="small" />
            </li>
            <li>
              <PageButton icon={faPeopleGroup} to="/settings" size="small" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CallSheetPreview;
