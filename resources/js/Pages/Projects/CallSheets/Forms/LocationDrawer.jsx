import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import DrawerPanel from '@/Components/Layouts/DrawerPanel';
import CircularButton from '@/Components/Buttons/CircularButton';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

 
import Address from '@/Components/Forms/Address';


export default function CallSheetPanel({data, mode = 'create', ...props}) {
  const { user, fetchUserData } = useAuth();

  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
  }, []);

 





  const { isDrawerPanelOpen, toggleDrawerPanel } = props;
  const [emptyFields, setEmptyFields] = useState({});
  const [processing, setProcessing] = useState(false);

  const today = new Date().toISOString().split('T')[0];

 

  const [callSheetAddress, setCallSheetAddress] = useState({
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
  });

  useEffect(() => {
    if (mode === 'edit' && data) {
 
      setCallSheetAddress({
        street_address: data.film_location.location.street_address || '',
        city: data.film_location.location.city || '',
        state: data.film_location.location.state || '',
        zip_code: data.film_location.location.zip_code || '',
      });
    } else {
 
      setCallSheetAddress({
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
      });
    }
  }, [mode, data, today]);
  
  

  const clearFormData = () => {
 
    setCallSheetAddress({
      street_address: '',
      city: '',
      state: '',
      zip_code: '',
    });
  
  };


  const handleUpdateFormData = (field, value) => {
 
    setCallSheetAddress(prevData => ({
      ...prevData,
      [field]: value
    }));

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
      if (mode === 'create') {
        // Create a new call sheet
        const callSheetResponse = await router.post(
          route('projects.callSheets.create', { id: data.id }),
          { callSheetData, callSheetAddress }
        );
        clearFormData();
      } else if (mode === 'edit' && data) {
        // Update an existing call sheet
        const callSheetResponse = await router.put(
          route('projects.callSheets.update', { id: data.project_id, callSheetId: data.id }),
          { callSheetData, callSheetAddress }
        );
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
 
             <h2>Add Location Details</h2>
             <p className="p-base">
                 Add parking and hospital details here.
             </p>
        </div>
      ),
      body:(
        <div className='flex flex-col gap-6'>
 

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
 