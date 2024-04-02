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
    setResetSignal(!resetSignal); 
  };

  const handleSave = async () => {
      const combinedData = {
          location: accordionData.location,
          parking: accordionData.parking,
          hospital: accordionData.hospital,
          accordionInfo: accordionInfo,
          id: mode !== 'create' ? callSheet.id : undefined
      };

      try {
          let response;
          if (mode === 'create') {
              response = await axios.post(route('projects.callSheets.save.locations', { id: project.id, callSheetId: callSheet.id }), combinedData);
          } else {
              response = await axios.put(route('projects.callSheets.update.locations', { id: project.id, callSheetId: callSheet.callSheetId }), combinedData);
          }

          if (response.status === 200) {
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
        const endpoint = route('projects.callSheets.delete.location', {
            id: project.id,
            callSheetId: callSheet.callSheetId,
            locationId: callSheet.location.id
        });

        const response = await axios.delete(endpoint);

        if (response.status === 200) {

            updateCurrentCallSheet(response.data.updatedCallSheet);
            triggerReset();

            onClose();  
        }
    } catch (error) {
        console.error('Error deleting the location:', error);
    }
};



  useEffect(() => {
    setMapKey(Math.random());
}, [accordionData.location]);

  useEffect(() => {
      if (mode !== 'create' && callSheet) {
          const locationData = callSheet.location ? {
              ...callSheet.location
          } : {};

          const parkingData = callSheet.parking_location ? {
              ...callSheet.parking_location.location
          } : {};

          const hospitalData = callSheet.hospital_location ? {
              ...callSheet.hospital_location
          } : {};

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
