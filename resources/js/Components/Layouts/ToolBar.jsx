import React from 'react';

import CircularButton from '@/Components/Buttons/CircularButton'; // Updated import
import PrimaryButton from '@/Components/Buttons/PrimaryButton'; // Updated import
import SecondaryButton from '@/Components/Buttons/SecondaryButton';






function Toolbar({ title, callSheetTitle, actionButtons, onPrimaryButtonClick, children, cta_text, secondary_cta_text, handleSecondaryButtonClick }) {

 
  return (

      <div id="toolbar-container" className="flex flex-col h-[2.8rem]">

        <div id="toolbar-content" className="flex flex-row w-full h-full gap-4 justify-between ">

            <div className="justify-start grow flex flex-row justify-start justify-between items-center">
              <h1 className='primary-color font-bold'>Call Sheet: <span className='font-semibold text-slate-400'>{callSheetTitle ? callSheetTitle.call_sheet_name : title}</span></h1>
            </div>

            <div className="">
              {children.dropdown}
            </div>

            <div className="flex shrink-0 flex-row gap-4">
                {actionButtons &&
                  actionButtons.map((actionButton, index) => (
                    <div key={index} className={`action-button ${actionButton.isActive ? 'active-button' : ''}`}>
                        <CircularButton className="circular-button-small" icon={actionButton.icon} onClick={actionButton.onClick} />
                    </div>
                ))}
            </div>

            <div className="shrink-0 flex flex-row gap-6 justify-end h-full">
              {secondary_cta_text ? (
                  <SecondaryButton className="w-[8rem]" onClick={handleSecondaryButtonClick}>
                    {secondary_cta_text}
                  </SecondaryButton>
                ) : null}

              <PrimaryButton className="w-[14rem]" onClick={onPrimaryButtonClick}>{cta_text}</PrimaryButton>
            </div>

        </div>

      
      </div>

  );
};




export default Toolbar;
