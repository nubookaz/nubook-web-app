import React, { useState } from 'react';
import EmptyContent from '@/Components/Layouts/EmptyContent';  
import Toolbar from '@/Components/Layouts/Toolbar';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import PageButton from '@/Components/Buttons/IconButton';

import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import Settings from '@mui/icons-material/Settings';



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
                {`Currently, there are no ${pageType ? pageType.toLowerCase() : 'data'}.`} 
            </p>
          </EmptyContent>
        )}
      </div>
    );
  }
export default PortalLayout;
