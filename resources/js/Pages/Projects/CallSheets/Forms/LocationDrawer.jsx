import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import DrawerPanel from '@/Components/Layouts/DrawerPanel';
import CircularButton from '@/Components/Buttons/CircularButton';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Textarea from '@mui/joy/Textarea';
import { inputGroupClass, formGroupClass } from '@/Components/Scripts/Form';

 
import Address from '@/Components/Forms/Address';


export default function CallSheetPanel({data, mode = 'create', ...props}) {
  const { user, fetchUserData } = useAuth();

  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
  }, []);

 

 console.log(data);



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
        // Create a new call sheet
        const callSheetResponse = await router.post(
          route('callSheets.location.store', { 
            id: data.project_id,
            callSheetId: data.id,
          }));
        clearFormData();

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
 

          <div className='flex flex-col gap-4 '>
            <div className='flex flex-col gap-2'>
              <h3>Parking Location Address</h3>
              <p className="p-base">
                To guarantee a hassle-free parking experience on the day of production, it’s essential to provide the full address of the parking location. Kindly include the street name, city, state, and ZIP code. Precise parking details will help the crew and cast park swiftly and close to the set.
              </p>
            </div>
            <div className={formGroupClass}>
              <div className={inputGroupClass}>
                <label htmlFor="parking_instructions" className='text-gray-400 text-sm'>Parking Instructions</label>
                <Textarea 
                  name="parking_instructions"
                  minRows={2} 
                  placeholder="Add parking instructions here...." 
                />
              </div>
            </div>

            <Address
              data={callSheetAddress}
              onUpdateInfo={handleUpdateFormData}
              emptyFields={emptyFields}
              setEmptyFields={setEmptyFields}
            />
            
          </div>


          <div className='flex flex-col gap-4 '>
            <div className='flex flex-col gap-2'>
              <h3>Hospital Location Address</h3>
              <p className="p-base">
                For quick access in case of an emergency, a complete address of the nearest hospital is necessary. Please specify the hospital's street, city, state, and ZIP code. Having this information readily available ensures the safety of everyone on set and allows for immediate action if needed.
              </p>
            </div>
            <div className={formGroupClass}>
              <div className={inputGroupClass}>
                <label htmlFor="hospital_instructions" className='text-gray-400 text-sm'>Hospital Instructions</label>
                <Textarea 
                  name="hospital_instructions"
                  minRows={2} 
                  placeholder="Add hospital instructions here...." 
                />
              </div>
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
 