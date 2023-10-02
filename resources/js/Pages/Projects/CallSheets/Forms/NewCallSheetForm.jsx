// NewCallSheetForm.jsx

import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import RightPanel from '@/Components/Layouts/RightPanel';
import CallSheetForm from '@/Pages/Projects/CallSheets/Forms/CallSheetForm';
import CircularButton from '@/Components/Buttons/CircularButton';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


function NewCallSheetForm(props) {
  const [callSheetTitle, setCallSheetTitle] = useState('');
  const [callSheetDate, setCallSheetDate] = useState('');
  const { isRightPanelOpen, toggleRightPanel } = props;

  const callSheetData = {
    callSheetTitle,
    callSheetDate,
  };

  const validateFormContent = () => {
    const isTitleValid = callSheetTitle.trim() !== '';
    const isDateValid = callSheetDate !== '';

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

  const createCallSheet = async () => {
    const projectId = props.projectId;

    try {
      const callSheetResponse = await router.post(
        route('projects.callSheets.create', { id: projectId }),
        callSheetData
      );

      console.log('Response Call Sheet', callSheetResponse);
      toggleRightPanel(!isRightPanelOpen);
    } catch (error) {
      console.error('Error creating Call Sheet:', error);
    }
  };

  const handleSubmit = async () => {
    const isFormValidated = validateFormContent();

    if (isFormValidated) {
      console.log('Form is valid!');
      await createCallSheet();
    } else {
      console.error('Please fill out all required fields.');
    }
  };

  const renderButton = () => (
    <SecondaryButton onClick={handleSubmit}>
      Create Call Sheet
    </SecondaryButton>
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
            <h2>Create a new call sheet</h2>
            <p className="p-base">Enter details below for your new call sheet</p>
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

export default NewCallSheetForm;
