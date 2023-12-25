import React, { useState } from 'react';
 
import Drawer from '@mui/joy/Drawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';


export default function DrawerPanel({ containerClass, sxCustom, showCloseButton = false, anchor = "right", isForm = false, size = 'md',onSubmitForm, formAction, isDrawerPanelOpen, toggleDrawerPanel, children }) {
 


  const toggleDrawer = (inOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    toggleDrawerPanel(false);
  };


  return (
    <Drawer 
      open={isDrawerPanelOpen} 
      anchor={anchor} 
      onClose={toggleDrawer(false)}
      size={size}
      className="relative"
      sx={sxCustom}
    >

      <div className={` ${containerClass} p-8 h-full`}>
          {showCloseButton ? (
            <FontAwesomeIcon onClick={toggleDrawer(false)} className='cursor-pointer text-3xl text-red-500 absolute right-8' icon={faCircleXmark}></FontAwesomeIcon>
          ) : null}

          {isForm ? (

            <form className="flex flex-col h-full gap-6 justify-between" action={formAction} onSubmit={onSubmitForm}>
               {/* Header */}
              <div className="text-center">
                {children.header}
              </div>

              {/* Body */}
              <div className="drawer-body overflow-scroll h-full justify-start p-1">
                {children.body}
              </div>

              {/* Footer */}
              {children.footer ? (
                <div className="drawer-footer justify-end">
                  {children.footer}
                </div> 
              ) : null}

            </form>

          ):(
            <div className="flex flex-col h-full gap-6 justify-between">
              {/* Header */}
              <div className="text-center drawer-header">
                {children.header}
              </div>

              {/* Body */}
              <div className="drawer-body  h-full justify-start p-1">
                {children.body}
              </div>

              {/* Footer */}
              {children.footer ? (
                  <div className="drawer-footer">
                    {children.footer}
                  </div> 
              ) : null}
            </div>
          )}

      </div>
    </Drawer>
  );
}
