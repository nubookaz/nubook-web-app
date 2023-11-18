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

  const today = new Date().toISOString().split('T')[0];


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
          minDate={today}
      />



    </RightPanel>
  );
}
 