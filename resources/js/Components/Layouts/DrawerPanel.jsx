import React, { useState } from 'react';
 
import Drawer from '@mui/joy/Drawer';


export default function DrawerPanel({ anchor = "right", isDrawerPanelOpen, isForm, onSubmitForm, formAction, toggleDrawerPanel, children }) {
 


  const toggleDrawer = (inOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    toggleDrawerPanel(false);
  };


  return (
    <Drawer open={isDrawerPanelOpen} anchor={anchor} onClose={toggleDrawer(false)} className="relative">
      <div className='p-8 h-full'>
 

          {isForm ? (

            <form className="flex flex-col h-full gap-6 justify-between" action={formAction} onSubmit={onSubmitForm}>
               {/* Header */}
              <div className="text-center">
                {children.header}
              </div>

              {/* Body */}
              <div className="drawer-body grow">
                {children.body}
              </div>

              {/* Footer */}
              <div className="drawer-footer justify-end">
                {children.footer}
              </div> 
            </form>

          ):(
            <div className="flex flex-col h-full gap-6 justify-between">
              {/* Header */}
              <div className="mb-8 text-center drawer-header">
                {children.header}
              </div>

              {/* Body */}
              <div className="drawer-body">
                {children.body}
              </div>

              {/* Footer */}
              <div className="drawer-footer">
                {children.footer}
              </div> 
            </div>
          )}

      </div>
    </Drawer>
  );
}
