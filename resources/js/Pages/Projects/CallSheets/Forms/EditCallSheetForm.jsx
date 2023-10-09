import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import RightPanel from '@/Components/Layouts/RightPanel';
import CallSheetForm from '@/Pages/Projects/CallSheets/Forms/CallSheetForm';
import CircularButton from '@/Components/Buttons/CircularButton';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function EditCallSheetForm(props) {

  
  const [callSheetTitle, setCallSheetTitle] = useState('');
  const [callSheetDate, setCallSheetDate] = useState('');
  const { isRightPanelOpen, toggleRightPanel, callSheet } = props;

  const callSheetData = {
    callSheetTitle: callSheet.callSheetTitle || '',
    callSheetDate: callSheet.callSheetDate || '',
  };
  
  const validateFormContent = () => {
    const isTitleValid = callSheetData.callSheetTitle.trim() !== '';
    const isDateValid = callSheetData.callSheetDate !== '';
  
    return isTitleValid && isDateValid;
  };
  

  

  const handleCloseButtonClick = () => {
    const isFormComplete = checkFormStatus();

    if (isFormComplete) {
      const result = window.confirm('Are you sure you want to proceed?');

      if (result) {
        setCallSheetTitle('');
        setCallSheetDate('');
        toggleRightPanel(!isRightPanelOpen);
      }
    } else {
      toggleRightPanel(false);
    }
  };

  const checkFormStatus = () => {
    return callSheetTitle.trim() !== '' || callSheetDate.trim() !== '';
  };

  const updateCallSheet = async () => {
    const projectId = props.projectId;
    const callSheetId = callSheet.id;
  
    try {
      const payload = {
        ...(callSheetData || {}),
      };
  
      if (callSheetTitle !== callSheetData.callSheetTitle) {
        payload.callSheetTitle = callSheetTitle;
      }
  
      if (callSheetDate !== callSheetData.callSheetDate) {
        payload.callSheetDate = callSheetDate;
      }
  
      const callSheetResponse = await router.patch(
        route('projects.callSheets.update', { id: projectId, callSheetId }),
        payload
      );
  
      console.log('Response Call Sheet', callSheetResponse);
      toggleRightPanel(!isRightPanelOpen);
    } catch (error) {
      console.error('Error updating Call Sheet:', error);
    }
  };
  
  
  

  const handleSubmit = async () => {
    const isFormValidated = validateFormContent();

    if (isFormValidated) {
      console.log('Form is valid!');
      await updateCallSheet();
    } else {
      console.error('Please fill out all required fields.');
    }
  };

  const renderButton = () => (
    <SecondaryButton onClick={handleSubmit}>Update Call Sheet</SecondaryButton>
  );

  const renderBackButton = () => (
    <CircularButton
      icon={faXmark}
      size="small"
      onClick={handleCloseButtonClick}
    />
  );

  return (
    <RightPanel
      isRightPanelOpen={isRightPanelOpen}
      toggleRightPanel={toggleRightPanel}
      showSlideOutPanel={false}
      panel_header={
        <div className="header">
          <div>
            <h2>Edit call sheet</h2>
            <p className="p-base">Modify details below for the call sheet</p>
          </div>
        </div>
      }
      panel_footer={
        <div className="flex flex-row gap-4">
          {renderBackButton()}
          {renderButton()}
        </div>
      }
    >
      <CallSheetForm
        callSheetData={callSheetData}
        setCallSheetTitle={setCallSheetTitle}
        setCallSheetDate={setCallSheetDate}
        checkFormStatus={checkFormStatus}
      />
    </RightPanel>
  );
}

export default EditCallSheetForm;
