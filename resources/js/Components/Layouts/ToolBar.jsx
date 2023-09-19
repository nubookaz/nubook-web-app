import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CircularButton from '@/Components/Buttons/CircularButton'; // Updated import
import PrimaryButton from '@/Components/Buttons/PrimaryButton'; // Updated import
import PageButton from '@/Components/Buttons/PageButton';






function Toolbar({ title, actionButtons, href, onButtonClick, children, cta_text }) {



  return (


    <div className="toolbar-container flex flex-col h-full">


      <div className="toolbar-content flex flex-row w-full justify-between items-center mb-4">


        {/* Column 1: Left Arrow Icon */}
     
        <div className="toolbar-column-1 justify-start self-center flex flex-row justify-between items-center">
          <div className='w-[50px] h-[50px]'>
            {href && (
              <PageButton className="!my-auto" size="small" icon={faArrowLeft} href={href}>
              </PageButton>
            )}
          </div>

          <h1 className='ml-4 secondary-color'>{title}</h1>
        </div>



        {/* Column 3: Center optional filters */}
        <div className="toolbar-column-2 w-8/12">

        </div>



        {/* Column 4: Optional Action Buttons */}
        <div className="toolbar-column-3 flex flex-row gap-4">
          {actionButtons &&
            actionButtons.map((actionButton, index) => (
              <div key={index} className={`action-button ${actionButton.isActive ? 'active-button' : ''}`}>
                <CircularButton className="circular-button-small" icon={actionButton.icon} onClick={actionButton.onClick} />
              </div>
            ))}
        </div>



        {/* Column 5: Call to Action Button */}
        <div className="toolbar-column-4 justify-end">
          <PrimaryButton onClick={onButtonClick}>{cta_text}</PrimaryButton>
        </div>
      </div>



      {/* Center Content */}
      <div className="portal-body h-full p-4 px-20">
        {children}
      </div>


    </div>



  );
};




export default Toolbar;
