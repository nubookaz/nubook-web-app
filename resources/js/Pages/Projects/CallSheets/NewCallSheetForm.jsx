import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import RightPanel from '@/Components/Layouts/RightPanel';
import CircularButton from '@/Components/Buttons/CircularButton';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import CallSheetDetails from '@/Pages/Projects/CallSheets/CallSheetDetails';

import { faXmark } from '@fortawesome/free-solid-svg-icons';  





function NewCallSheetForm(props) {
    const [callSheetTitle, setCallSheetTitle] = useState(''); // Local state within ProjectForm
    const [callSheetDate, setCallSheetDate] = useState(''); // Local state within ProjectForm
    const [isFormValid, setIsFormValid] = useState(true); // Initialize to true
    const { isRightPanelOpen, toggleRightPanel } = props;



    const callSheetData = {
        callSheetTitle,
        callSheetDate,
    };


    const toggleRightPanelAndSlideOut = () => {
        setIsRightPanelOpen(!isRightPanelOpen);
        setShowSlideOutPanel(true); // Make sure the slide-out panel is always visible
    };


    const validateForm = (event) => {

          const isFormValidated = validateFormContent();
      
          if (isFormValidated) {
            console.log("Form is valid!");
            submit();
          } else {
            // Display an error message or take appropriate action for missing requirements on step one
            console.error('Please fill out all required fields on step one.');
          }
       
    };



    const createCallSheet = (callSheetData, projectId) => {
        return new Promise((resolve, reject) => {
          // Use the route helper to generate the URL for creating a call sheet
          const routeName = 'projects.callSheets.create';
          
          // Include the projectId as a route parameter
          const routeParams = { id: projectId };
      
          router.post(route(routeName, routeParams), callSheetData, {
            onSuccess: (callSheetResponse) => {
              console.log("Create", callSheetData);
              console.log("Response Call Sheet", callSheetResponse);
              toggleRightPanel(!isRightPanelOpen);

              resolve(callSheetResponse);
            },
            onError: (callSheetError) => {
              console.log("Create", callSheetData);
              console.error('Error creating Call Sheet:', callSheetError);
              reject(callSheetError);
            },
          });
        });
      };
      
      const submit = async () => {
        console.log(callSheetData);
        const projectId = props.projectId; // Access the project ID from props
        console.log(projectId);
      
        // Call createCallSheet without try-catch
        await createCallSheet(callSheetData, projectId);
      };
      
    
  



    const validateFormContent = () => {
        // Check if projectName and projectStatus are both filled out
        const isTitleValid = callSheetTitle.trim() !== '';
        const isDateValid = callSheetDate !== '';
  
        // Update the validation status for step one based on both fields
        setIsFormValid(isTitleValid && isDateValid );
      
        // Return true if both fields are filled out
        return isTitleValid && isDateValid;
    };


    const handleCloseButtonClick = () => {
        // Assuming isFormComplete is a boolean indicating form completeness
        const isFormComplete = checkFormStatus();
        
        if (isFormComplete) {
            const result = window.confirm("Are you sure you want to proceed?");

            if (result) {
            setCallSheetTitle('');
            setCallSheetDate('');
            toggleRightPanel(!isRightPanelOpen);

            }
        } else {          
            // Close the panel when the form is not complete
            toggleRightPanel(false);

        };
    };


    const checkFormStatus = () => {
        // Initialize isFormComplete as false
        let isFormComplete = false;
      
        isFormComplete =
          callSheetTitle.trim() !== '' ||
          callSheetDate.trim() !== '';
      
        return isFormComplete;
      };
      




    const renderButton = () => {
        return <SecondaryButton onClick={validateForm}>Create Call Sheet</SecondaryButton>;
    };

    const renderBackButton = () => {
        return <CircularButton icon={faXmark} size="small" onClick={handleCloseButtonClick} />;
    };








return (
    <RightPanel
      isRightPanelOpen={isRightPanelOpen}
      toggleRightPanel={toggleRightPanelAndSlideOut}
      showSlideOutPanel={false}



      panel_header={
        <div className='header'>
 
        </div>
      }
      


      panel_footer={
        <div className='flex flex-row gap-4'>
          {renderBackButton()}
          {renderButton()}
        </div>
      }
    >


      <div>
        <CallSheetDetails 
            callSheetData={{
                callSheetTitle,
                callSheetDate,
            }}        
            setCallSheetTitle={setCallSheetTitle}
            setCallSheetDate={setCallSheetDate}
            checkFormStatus={checkFormStatus}
        />
      </div>
    

    
    </RightPanel>
  );



}



export default NewCallSheetForm;