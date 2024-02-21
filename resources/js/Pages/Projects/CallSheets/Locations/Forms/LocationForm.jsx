import { useCallSheet } from '@/Components/Contexts/CallSheetContext';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { debounce } from 'lodash';
import { router } from '@inertiajs/react';

import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import GoogleMap from '../../Components/GoogleMap';
import Accordion from './Partials/Accordion';

import ErrorBoundary from '@/Components/Errors/ErrorBoundary';
import IconButton from '@/Components/Buttons/IconButton';
import { faTrash } from '@fortawesome/free-solid-svg-icons';



const LocationForm = ({

  project,
  callSheet,
  onClose,
  mode = 'create',

}) => {

 
  const { updateCurrentCallSheet } = useCallSheet();
  
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
      setFadeIn(true); 
 
  }, []);

  const [accordionData, setAccordionData] = useState({
    location: { address: {} },
    parking: { address: {} },
    hospital: { address: {} }
  });

  const [accordionInfo, setAccordionInfo] = useState({
    location: '',
    parking: '',
    hospital: ''
  });

  const debouncedSetAccordionData = useCallback(
    debounce((newData) => setAccordionData(newData), 0),
    []
  );

  const handleAccordionDataChange = (newAccordionData) => {
    debouncedSetAccordionData(newAccordionData);
  };

  const handleAccordionInfoChange = (newInfo) => {
    setAccordionInfo(newInfo);
  };

  const locationNameRef = useRef();
  
  const [mapKey, setMapKey] = useState(Math.random());
  const [resetSignal, setResetSignal] = useState(false);
  const triggerReset = () => {
    setResetSignal(!resetSignal); // Toggle the state to send a new signal
  };

  const handleSave = async () => {
      const combinedData = {
          location: accordionData.location,
          parking: accordionData.parking,
          hospital: accordionData.hospital,
          accordionInfo: accordionInfo,
          // Include ID if available in edit mode
          id: mode !== 'create' ? callSheet.id : undefined
      };

      try {
          let response;
          if (mode === 'create') {
              response = await axios.post(route('projects.callSheets.save.locations', { id: project.id, callSheetId: callSheet.id }), combinedData);
              // Handle newly created data with ID from response if needed
          } else {
              response = await axios.put(route('projects.callSheets.update.locations', { id: project.id, callSheetId: callSheet.callSheetId }), combinedData);
          }

          if (response.status === 200) {
              // Update currentCallSheet with new or updated data
              // Ensure this includes the necessary ID
              updateCurrentCallSheet(response.data);
              onClose();
              triggerReset();
          }
      } catch (error) {
          console.error('Error submitting location data:', error);
      }

      setMapKey(Math.random());
  };

 

  const handleDelete = async () => {
    try {
        // Construct the endpoint URL
        const endpoint = route('projects.callSheets.delete.location', {
            id: project.id,
            callSheetId: callSheet.callSheetId,
            locationId: callSheet.location.id
        });

        // Send the DELETE request
        const response = await axios.delete(endpoint);

        // Check for successful response
        if (response.status === 200) {
            console.log(response); // Logging the response for debugging

            // Update the current call sheet in your state/context
            updateCurrentCallSheet(response.data.updatedCallSheet);

            // Reset any local state or UI elements if necessary
            triggerReset();

            // Close the modal or dialogue if one is open
            onClose();  
        }
    } catch (error) {
        console.error('Error deleting the location:', error);
        // Handle errors here, such as displaying a message to the user
        // Consider using a UI notification or alert to inform the user
    }
};



  useEffect(() => {
    setMapKey(Math.random());
}, [accordionData.location]);

  useEffect(() => {
      if (mode !== 'create' && callSheet) {
          // Extract and map data from callSheet to accordionData structure
          const locationData = callSheet.location ? {
              ...callSheet.location
              // Add other properties or transformations if needed
          } : {};

          const parkingData = callSheet.parking_location ? {
              ...callSheet.parking_location.location
              // Add other properties or transformations if needed
          } : {};

          const hospitalData = callSheet.hospital_location ? {
              ...callSheet.hospital_location
              // Add other properties or transformations if needed
          } : {};

          // Update accordionData with the mapped data
          setAccordionData({
              location: locationData,
              parking: parkingData,
              hospital: hospitalData,
          });
      }
  }, [callSheet, mode]);



 
  return (

    <div className='flex flex-row w-[80rem] h-[55rem]'>
        {/* <div className='h-full w-full max-w-[30rem]'>
            <GoogleMap mapKey={mapKey} locationData={accordionData} />
        </div> */}
        <div className={`fade-in w-full flex flex-col gap-4 justify-between p-10 ${fadeIn ? 'opacity-1' : 'opacity-0'}`}>
            <div className='flex flex-col'>
                <h2 className='text-2xl text-slate-500'>Location Details</h2>
                <p className='text-slate-400'>Add filming location details here</p>
            </div>
    
            <Accordion 
                ref={locationNameRef}
                locationType={callSheet.locationType}
                callSheet={callSheet}
                onAccordionDataChange={handleAccordionDataChange}
                onAccordionInfoChange={handleAccordionInfoChange}
                resetSignal={resetSignal}
            />

            <div className={`flex flex-row mx-auto gap-6 w-full ${mode == 'create' ? 'max-w-[25rem]' : 'max-w-[35rem]' }`}>
                {mode != 'create' ? 

                    (
                      <IconButton 
                          icon={faTrash}
                          onClick={handleDelete} 
                          buttonClass='text-xl my-auto text-rose-500 group-hover:text-white' 
                          className='cursor-pointer max-w-[5rem] duration-500 transition-all bg-slate-100 w-full rounded-lg group hover:bg-rose-500'
                      >
                      </IconButton>
                    ):null

                }
                    
                <SecondaryButton onClick={onClose} className='w-full h-full p-0'>Cancel</SecondaryButton>
                <PrimaryButton onClick={handleSave} className='w-full h-full  p-0'>
                    {mode == 'create' ? 'Add Location' : 'Update Location'}
                </PrimaryButton>
            </div>

        </div>
    </div>

  );
};

export default LocationForm;
