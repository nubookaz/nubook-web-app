import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import DrawerPanel from '@/Components/Layouts/DrawerPanel';
import CircularButton from '@/Components/Buttons/CircularButton';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import Details from '@/Pages/Projects/CallSheets/Forms/Details';
import Address from '@/Components/Forms/Address';


export default function CallSheetDrawer({ data, newData, mode = 'create', ...props }) {
  const { user, fetchUserData } = useAuth();

  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
  }, []);

 

  const { isDrawerPanelOpen, toggleDrawerPanel } = props;
  const [emptyFields, setEmptyFields] = useState({});
  const [processing, setProcessing] = useState(false);

  const today = new Date().toISOString().split('T')[0];


  const [callSheetData, setCallSheetData] = useState({
    call_sheet_name: '',
    call_sheet_date: '',
  });

  const [callSheetAddress, setCallSheetAddress] = useState({
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
  });

  useEffect(() => {
    if (mode === 'edit' && data) {
      // In edit mode, use the data from the prop
      setCallSheetData({
        call_sheet_name: data.call_sheet_name || '',
        call_sheet_date: data.call_sheet_date || '',
      });
      const location = data.film_location && data.film_location.location;

      setCallSheetAddress({
        street_address: location ? location.street_address || '' : '',
        city: location ? location.city || '' : '',
        state: location ? location.state || '' : '',
        zip_code: location ? location.zip_code || '' : '',
      });
    } else {
      // In create mode, initialize with empty objects
      setCallSheetData({
        call_sheet_name: '',
        call_sheet_date: '', // Initialize with today's date or your preferred default
      });
  
      setCallSheetAddress({
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
      });
    }
  }, [mode, data, today]);
  
  

  const clearFormData = () => {
    // Clear out the projectData state
    setCallSheetData({
      call_sheet_name: '',
      call_sheet_date: '',
    });

    setCallSheetAddress({
      street_address: '',
      city: '',
      state: '',
      zip_code: '',
    });
  
  };


  const handleUpdateFormData = (field, value) => {

    if (field === 'call_sheet_name' || field === 'call_sheet_date') {
      setCallSheetData(prevData => ({
        ...prevData,
        [field]: value
      }));
    } else {
      setCallSheetAddress(prevData => ({
        ...prevData,
        [field]: value
      }));
    }

  };
  
 

  const handleCloseButtonClick = () => {
      clearFormData();
      console.log("close");
      toggleDrawerPanel(false);
  };


  const handleSubmit = async (e) => {

    e.preventDefault();
    setProcessing(true);
    const projectId = props.projectId;

    try {
      let callSheetResponse;

      if (mode === 'create') {
        callSheetResponse = await router.post(
          route('projects.callSheets.create', { id: data.id }),
          { 
            callSheetData: callSheetData, 
            callSheetAddress: callSheetAddress, 
          }
        );
        clearFormData();

       } else if (mode === 'edit' && data) {
        // Update an existing call sheet
        callSheetResponse = await axios.put(
          route('callSheets.update.details', { id: data.project_id, callSheetId: data.id }),
          { 
            callSheetData: callSheetData, 
            callSheetAddress: callSheetAddress, 
          }
        );
 

          // Check if the response status is OK (200)
          if (callSheetResponse.status === 200) {
            const responseData = callSheetResponse.data;
            newData(responseData.callSheet);
          } else {
            // Handle other response status codes (e.g., errors) if needed
            console.log('Error:', callSheetResponse.statusText);
        }
    }

      if (callSheetResponse && callSheetResponse.status === 200) {
        // console.log(callSheetResponse);
        // window.location.href = callSheetResponse.headers.location;
      } else {
        console.log(callSheetResponse);
      }
      
      toggleDrawerPanel(false);

      } catch (error) {
          // Handle errors if needed
          console.log(error);
  
      } finally {
          // Set processing back to false regardless of success or failure
          setProcessing(false);
      }
  };


  return (
    <DrawerPanel
      isDrawerPanelOpen={isDrawerPanelOpen}
      toggleDrawerPanel={toggleDrawerPanel}
      isForm={true}
      onSubmitForm={handleSubmit}
    >

    {{
      header:(
        <div>
            {mode === 'create' ? (
              <h2>Create a new call sheet</h2>
            ) : (
              <h2>Edit call sheet</h2>
            )}
            <p className="p-base">
              {mode === 'create'
                ? "Lights, camera, action! It's time to put together your call sheet for an upcoming production. Fill in the following essential details."
                : "Edit the call sheet details below."}
            </p>
        </div>
      ),
      body:(
        <div className='flex flex-col gap-6'>
         <Details
            data={callSheetData}
            onUpdateInfo={handleUpdateFormData}
            emptyFields={emptyFields}
            setEmptyFields={setEmptyFields}
            minDate={today}
          />

          <div className='flex flex-col gap-6 '>
            <div className='flex flex-col gap-2'>
              <h3>Complete Location Address</h3>
              <p className="p-base">Ensuring an accurate location address is crucial for a smooth production day. Please provide a detailed address, including street, city, state, and ZIP code. This information will help your team arrive at the right place with ease and make your filmmaking day run like clockwork.</p>
            </div>
            <Address
              data={callSheetAddress}
              onUpdateInfo={handleUpdateFormData}
              emptyFields={emptyFields}
              setEmptyFields={setEmptyFields}
            />
          </div>

        </div>
      ),
      footer:(
        <div className="flex flex-row gap-4">
          <CircularButton
            icon={faXmark}
            size="small"
            onClick={handleCloseButtonClick}
          />
          <SecondaryButton buttonType="submit" onSubmit={handleSubmit} disabled={processing}>
            {mode === 'create' ? 'Create Call Sheet' : 'Update Call Sheet'}
          </SecondaryButton>
        </div>
      )

    }}

    </DrawerPanel>
  );
}
 