import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import RightPanel from '@/Components/Layouts/RightPanel';
import CallSheetForm from '@/Pages/Projects/CallSheets/Forms/CallSheetForm';
import CircularButton from '@/Components/Buttons/CircularButton';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


export default function CallSheetPanel(props) {
  const { user, fetchUserData } = useAuth();

  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
  }, []);



  const { isRightPanelOpen, toggleRightPanel } = props;
  const [emptyFields, setEmptyFields] = useState({});
  const [processing, setProcessing] = useState(false);

  const [callSheetData, setCallSheetData] = useState({
    call_sheet_name: '',
    call_sheet_date: '',
  });

  const clearFormData = () => {
    // Clear out the projectData state
    setCallSheetData({
      call_sheet_name: '',
      call_sheet_date: '',
    });
  
  };
  
 
  console.log(props);
  // const validateFormContent = () => {
  //   const isTitleValid = callSheetTitle.trim() !== '';
  //   const isDateValid = callSheetDate !== '';

  //   return isTitleValid && isDateValid;
  // };

  // const handleCloseButtonClick = () => {
  //   const isFormComplete = checkFormStatus();

  //   if (isFormComplete) {
  //     const result = window.confirm('Are you sure you want to proceed?');

  //     if (result) {
  //       setCallSheetTitle('');
  //       setCallSheetDate('');
  //       toggleRightPanel(!isRightPanelOpen);
  //     }
  //   } else {
  //     toggleRightPanel(false);
  //   }
  // };

  // const checkFormStatus = () => {
  //   return callSheetTitle.trim() !== '' || callSheetDate.trim() !== '';
  // };

  // const createCallSheet = async () => {
  //   const projectId = props.projectId;

  //   try {
  //     const callSheetResponse = await router.post(
  //       route('projects.callSheets.create', { id: projectId }),
  //       callSheetData
  //     );

  //     console.log('Response Call Sheet', callSheetResponse);
  //     toggleRightPanel(!isRightPanelOpen);
  //   } catch (error) {
  //     console.error('Error creating Call Sheet:', error);
  //   }
  // };

  // const handleSubmit = async () => {
  //   const isFormValidated = validateFormContent();

  //   if (isFormValidated) {
  //     console.log('Form is valid!');
  //     await createCallSheet();
  //   } else {
  //     console.error('Please fill out all required fields.');
  //   }
  // };

 


  const handleUpdateFormData = (field, value) => {
    setCallSheetData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
 

  const handleCloseButtonClick = () => {
      clearFormData();
      console.log("close");
      toggleRightPanel(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const projectId = props.projectId;

    console.log("submit", callSheetData);

      try {


      const callSheetResponse = await router.post(
        route('projects.callSheets.create', { id: projectId }),
            callSheetData,
      );

        clearFormData();

      } catch (error) {
          // Handle errors if needed
          console.log(error);
  
      } finally {
          // Set processing back to false regardless of success or failure
          setProcessing(false);
      }

};



  return (
    <RightPanel
      isRightPanelOpen={isRightPanelOpen}
      isForm={true}
      onSubmitForm={submit}



      
      panel_header={
        <div className="header">
          <div>
            <h2>Create a new call sheet</h2>
            <p className="p-base">Enter details below for your new call sheet</p>
          </div>
        </div>
      }
      panel_footer={
        <div className="flex flex-row gap-4">
          <CircularButton
            icon={faXmark}
            size="small"
            onClick={handleCloseButtonClick}
          />
          <SecondaryButton buttonType="submit" onSubmit={submit} disabled={processing}>
            Create Call Sheet
          </SecondaryButton>
        </div>
      }
    >



      <CallSheetForm
          data={callSheetData}
          onUpdateCallSheetInfo={handleUpdateFormData}
          emptyFields={emptyFields}
          setEmptyFields={setEmptyFields}
      />



    </RightPanel>
  );
}
 