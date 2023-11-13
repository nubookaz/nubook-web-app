import React, { useState } from 'react';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import CircularButton from '../Buttons/CircularButton';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function RightPanel({ isRightPanelOpen, isForm, onSubmitForm, formAction, toggleRightPanel, children, panel_header, panel_footer, showSlideOutPanel }) {
  const [slideOutPanelVisible, setSlideOutPanelVisible] = useState(false);


  // Function to close the right panel with separate delays
  const toggleCloseRightPanel = () => {
    // Close the slide-out panel first after a delay
    setTimeout(() => {
      setSlideOutPanelVisible(false); // Close the slide-out panel immediately

      // You can adjust the delay for the right panel here if needed
      setTimeout(() => {
        toggleRightPanel(false); // Close the right panel after the slide-out panel is closed
      }, 0); // Adjust the delay time as needed for the right panel
    }, 0); // Adjust the first delay time as needed for the slide-out panel
  };

  // Function to toggle the right panel with separate delays
  const toggleOpenRightPanel = () => {
    // Toggle the visibility of the right panel first
    toggleRightPanel(!isRightPanelOpen);

    // Add a delay to close the slide-out panel after the right panel is opened
    setTimeout(() => {
      setSlideOutPanelVisible(!isRightPanelOpen);

      // Toggle the visibility of the right panel after the slide-out panel is closed
      setTimeout(() => {
        toggleRightPanel(!isRightPanelOpen);
      }, 300); // Adjust the second delay time as needed
    }, 200); // Adjust the first delay time as needed
  };


  return (
    <div className="relative">
      <div className={`panel-container right-panel z-40 ${isRightPanelOpen ? 'visible' : ''}`}>
 

          {isForm ? (

            <form className="panel-content" action={formAction} onSubmit={onSubmitForm}>
               {/* Header */}
              <div className="mb-8 text-center panel-header">
                {panel_header}
              </div>

              {/* Body */}
              <div className="panel-body">
                {children}
              </div>

              {/* Footer */}
              <div className="panel-footer">
                {panel_footer}
              </div> 
            </form>

          ):(
            <div className="panel-content">
              {/* Header */}
              <div className="mb-8 text-center panel-header">
                {panel_header}
              </div>

              {/* Body */}
              <div className="panel-body">
                {children}
              </div>

              {/* Footer */}
              <div className="panel-footer">
                {panel_footer}
              </div> 
            </div>
          )}
         

      </div>
      {/* Slide-Out Panel */}
      <div className={`panel-container slide-out-panel z-30 ${isRightPanelOpen && showSlideOutPanel ? 'visible' : ''}`}>
        {isRightPanelOpen && showSlideOutPanel && (
          <p>This is the slide-out panel content.</p>
        )}
      </div>
    </div>
  );
}
