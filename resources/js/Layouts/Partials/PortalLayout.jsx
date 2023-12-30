import React, { useState } from 'react';
import EmptyContent from '@/Components/Layouts/EmptyContent';  
import Toolbar from '@/Components/Layouts/Toolbar';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import PageButton from '@/Components/Buttons/IconButton';

function PortalLayout({  callSheetData, hasData, toolbarTitle, pageType, onEmptyButtonClick, toolbarCTAText, buttonText, customSvgPath, onPrimaryToolbarButtonClick, children, backButtonHref, actionButtons, secondary_cta_text, handleSecondaryButtonClick }) {

    return (
      <div className="w-full h-full relative">
        <div className='w-[50px] h-[50px] absolute -left-[5rem]'>
        {backButtonHref && (
            <PageButton className="!my-auto" size="small" icon={faArrowLeft} href={backButtonHref}>
            </PageButton>
        )}
        </div>
        {hasData && Object.keys(hasData).length > 0 ? (
          <div className='h-full w-full gap-4 flex flex-col'>
            {toolbarTitle && ( 
              <Toolbar
                title={toolbarTitle}
                cta_text={toolbarCTAText}
                actionButtons={actionButtons}      
                secondary_cta_text={secondary_cta_text}
                onPrimaryButtonClick={onPrimaryToolbarButtonClick}       
                handleSecondaryButtonClick={handleSecondaryButtonClick}
                callSheetTitle={callSheetData}
              >

                {{
                    dropdown: <div className='flex justify-end min-w-[15rem] h-full'>{children.middle}</div>
                }}

              </Toolbar>
            )}
            {children.content}
          </div>
        ) : (
          <EmptyContent
            customSvgPath={customSvgPath}
            buttonText={buttonText}
            onButtonClick={onEmptyButtonClick}
          >
            <h2 className="mb-4">No {pageType} Available</h2>
            <p className="mb-4 p-base">
                {`Currently, there are no ${pageType ? pageType.toLowerCase() : 'data'}.`} {/* Change "Call Sheet" to a prop */}
                Please click the button below to create one.
            </p>
          </EmptyContent>
        )}
      </div>
    );
  }
export default PortalLayout;
