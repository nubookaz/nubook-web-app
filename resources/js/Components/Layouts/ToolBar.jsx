import React from 'react';

import CircularButton from '@/Components/Buttons/CircularButton'; // Updated import
import PrimaryButton from '@/Components/Buttons/PrimaryButton'; // Updated import
import SecondaryButton from '@/Components/Buttons/SecondaryButton';






function Toolbar({ title, actionButtons, onButtonClick, children, cta_text, secondary_cta_text, handleSecondaryButtonClick }) {



  return (


    <div className="toolbar-container flex flex-col">


      <div className="toolbar-content flex flex-row gap-8 w-full justify-between items-center mb-6">


        {/* Column 1: Left Arrow Icon */}
     
        <div className="toolbar-column-1 w-[20%] justify-start self-center grow flex flex-row justify-between items-center">
          <h1 className='primary-color'>{title}</h1>
        </div>



        {/* Column 3: Center optional filters */}
        <div className="toolbar-column-2">

        {children.dropdown}

        </div>



        {/* Column 4: Optional Action Buttons */}
        <div className="toolbar-column-3 flex shrink-0  flex-row gap-4">
            {actionButtons &&
              actionButtons.map((actionButton, index) => (
                <div key={index} className={`action-button ${actionButton.isActive ? 'active-button' : ''}`}>
                    <CircularButton className="circular-button-small" icon={actionButton.icon} onClick={actionButton.onClick} />
                </div>
            ))}
        </div>



        {/* Column 5: Call to Action Button */}
        <div className="toolbar-column-4 shrink-0 flex flex-row gap-6 justify-end ml-[10rem]">
        {secondary_cta_text ? (
            <SecondaryButton className="w-[17rem]" onClick={handleSecondaryButtonClick}>
              {secondary_cta_text}
            </SecondaryButton>
          ) : null}

          <PrimaryButton className="w-[17rem]" onClick={onButtonClick}>{cta_text}</PrimaryButton>
        </div>
      </div>



      {/* Center Content */}
      {/* <div className="portal-body h-full p-4 px-20">
        {children}
      </div> */}


    </div>



  );
};




export default Toolbar;
