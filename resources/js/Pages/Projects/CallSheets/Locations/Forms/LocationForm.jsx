import React, { useState, useEffect, useRef, useCallback } from 'react';
import { debounce } from 'lodash';



import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import GoogleMap from '../../Components/GoogleMap';
import Accordion from './Partials/Accordion';





const LocationForm = ({

  onClose,

}) => {

  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
      setFadeIn(true); 
 
  }, []);

  const [accordionData, setAccordionData] = useState({
    location: {},
    parking: {},
    hospital: {}
  });
  const [accordionInfo, setAccordionInfo] = useState({
    location: '',
    parking: '',
    hospital: ''
  });

  const debouncedSetAccordionData = useCallback(
    debounce((newData) => setAccordionData(newData), 800),
    []
  );

  const handleAccordionDataChange = (newAccordionData) => {
    debouncedSetAccordionData(newAccordionData);
  };

  const handleAccordionInfoChange = (newAccordionInfo) => {
    setAccordionInfo(newAccordionInfo);
  };

  const locationNameRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit logic here with combinedData
 
    // onClose(); // Uncomment if you want to close the form on submit
  };

 console.log('LocationForm', accordionData);
  return (

    <div className='flex flex-row w-[80rem] h-[55rem]'>
      <div className='h-full w-full max-w-[30rem]'>
        <GoogleMap locationData={accordionData} />
      </div>
      <div className={`fade-in w-full flex flex-col gap-4 justify-between p-10 ${fadeIn ? 'opacity-1' : 'opacity-0'}`}>
        <div className='flex flex-col'>
          <h2 className='text-2xl text-slate-500'>Location Details</h2>
          <p className='text-slate-400'>Add filming location details here</p>
        </div>
 
        <Accordion 
            ref={locationNameRef}
            onAccordionDataChange={handleAccordionDataChange}
            onAccordionInfoChange={handleAccordionInfoChange}
        />

        <div className='flex flex-row mx-auto gap-6 w-full max-w-[25rem]'>
          <SecondaryButton onClick={onClose} className='w-full h-full p-0'>Cancel</SecondaryButton>
          <PrimaryButton handle={handleSubmit} className='w-full h-full  p-0'>Add Location</PrimaryButton>
        </div>

      </div>
    </div>

  );
};

export default LocationForm;
