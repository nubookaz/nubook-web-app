import React, { useState, useEffect, forwardRef, useCallback } from 'react';

import AccordionContent from './AccordionContent'; // Import the new component
import Hospitals from './Hospitals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';


const Accordion = forwardRef(({ 
    
    callSheet,
    locationType = 'location',
    onAccordionDataChange,
    onAccordionInfoChange,
    resetSignal

}, 
    ref
    
) => {

    const [openAccordion, setOpenAccordion] = useState(locationType); // Initialize with locationType
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

    useEffect(() => {
        // Reset local state when resetSignal changes
        setAccordionData({
            location: {},
            parking: {},
            hospital: {}
        });
        setAccordionInfo({
            location: '',
            parking: '',
            hospital: ''
        });
      }, [resetSignal]);      
 
    const handleUpdate = useCallback((key, data) => {
        setAccordionData(prevData => ({ ...prevData, [key]: data }));
    }, []);

    const handleInformationUpdate = useCallback((key, info) => {
        setAccordionInfo(prevInfo => ({ ...prevInfo, [key]: info }));
    }, []);
    

    const handleSelectHospital = (hospital) => {
         
        let hospitalData = hospital;

        // For new hospital data, format as needed
        if (!hospital.address || !hospital.address.place_id) {
            hospitalData = {
                name: hospital.name,
                address: {
                    place_id: hospital.place_id,
                    city: '', // To be extracted from hospital data
                    latitude: hospital.geometry.location.lat,
                    longitude: hospital.geometry.location.lng,
                    state: '',  
                    street_address: hospital.vicinity, // Or another appropriate field
                    zip_code: '' // To be derived as needed
                },
                information: '' // Additional information
            };
        }
    
        setAccordionData(prevData => ({
            ...prevData,
            hospital: hospitalData
        }));
    };

    
    
    useEffect(() => {
        if (callSheet) {
            setAccordionData(prevData => ({
                ...prevData,
                location: callSheet.location ? callSheet.location : { address: {} },
                parking: callSheet.parking_location ? callSheet.parking_location : { address: {} },
                hospital: callSheet.hospital_location ? callSheet.hospital_location : { address: {} }
            }));
        }
    }, [callSheet]);
    

 
    const toggleAccordion = (accordionName) => {
        setOpenAccordion(prevOpen => prevOpen === accordionName ? null : accordionName);
    };

    const accordionContentStyle = (accordionName) => ({
        maxHeight: openAccordion === accordionName ? '500px' : '0px',
        overflow: 'hidden',
        transition: 'max-height 0.5s ease-in-out, padding 0.5s ease-in-out',
        padding: openAccordion === accordionName ? '20px' : '0px'
    });
    

    useEffect(() => {
        onAccordionDataChange(accordionData);
        onAccordionInfoChange(accordionInfo);
    }, [accordionData, accordionInfo, onAccordionDataChange, onAccordionInfoChange]);

     useEffect(() => {
        setOpenAccordion(locationType);
    }, [locationType]);

    return(

        <div className='flex flex-col gap-2'>
            {/* Location Info Accordion */}
            <div className='flex flex-col gap-2'>
                <button onClick={() => toggleAccordion('location')} className={`${openAccordion === 'location' ? 'bg-slate-300 font-semibold shadow-sm' : ''} bg-slate-100 py-4 px-6 rounded-lg text-slate-500 flex flex-row justify-between items-center`}>
                    Primary Location Details
                    <FontAwesomeIcon
                        icon={faCaretLeft}
                        className={`${openAccordion === 'location' ? 'rotate-90' : ''}`}
                        style={{
                            transform: openAccordion === 'location' ? 'rotate(-90deg)' : '',
                            transition: 'transform 0.3s ease-in-out'
                        }}
                    />
                </button>

                <div style={accordionContentStyle('location')} >
                    <AccordionContent 
                        callSheet={callSheet}
                        dataType='location'
                        title="Location Name"
                        label='Location'
                        onFormDataChange={(data) => handleUpdate('location', data)} 
                        onInformationChange={(info) => handleInformationUpdate('location', info)}
                        ref={ref} 
                        resetSignal={resetSignal}
                    />
                </div>
            </div>

            {/* Parking Info Accordion */}
            <div className='flex flex-col gap-2'>
                <button onClick={() => toggleAccordion('parking')} className={`${openAccordion === 'parking' ? 'bg-slate-200' : ''} bg-slate-100 py-4 px-6 rounded-lg text-slate-500 flex flex-row justify-between items-center`}>
                    Parking Details
                    <FontAwesomeIcon
                        icon={faCaretLeft}
                        className={`${openAccordion === 'parking' ? 'rotate-90' : ''}`}
                        style={{
                            transform: openAccordion === 'parking' ? 'rotate(-90deg)' : '',
                            transition: 'transform 0.3s ease-in-out'
                        }}
                    />
                </button>
                <div style={accordionContentStyle('parking')}>
                    <AccordionContent 
                        callSheet={callSheet}
                        dataType='parking'
                        title="Parking Name"
                        label='Location'
                        onFormDataChange={(data) => handleUpdate('parking', data)} 
                        onInformationChange={(info) => handleInformationUpdate('parking', info)}
                        ref={ref}
                        resetSignal={resetSignal}
                    />
                </div>
            </div>

            {/* Hospital Info Accordion */}
            <div className='flex flex-col gap-2'>
                <button onClick={() => toggleAccordion('hospital')} className={`${openAccordion === 'hospital' ? 'bg-slate-200' : ''} bg-slate-100 py-4 px-6 rounded-lg text-slate-500 flex flex-row justify-between items-center`}>
                    Nearby Hospital Locations
                    <FontAwesomeIcon
                        icon={faCaretLeft}
                        className={`${openAccordion === 'hospital' ? 'rotate-90' : ''}`}
                        style={{
                            transform: openAccordion === 'hospital' ? 'rotate(-90deg)' : '',
                            transition: 'transform 0.3s ease-in-out'
                        }}
                    />
                </button>
                <div style={accordionContentStyle('hospital')}>
                    <Hospitals existingHospitalData={callSheet.hospital_location} locationAddress={accordionData.location?.address} onSelectHospital={handleSelectHospital} />
                </div>
            </div>
        </div>

    );

});

export default Accordion;