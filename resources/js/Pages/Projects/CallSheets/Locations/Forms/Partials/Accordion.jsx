import React, { useState, useEffect, forwardRef, useCallback } from 'react';

import AccordionContent from './AccordionContent'; // Import the new component
import Hospitals from './Hospitals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';


const Accordion = forwardRef(({ 
    
onAccordionDataChange

}, 
    ref
    
) => {


 
    const [openAccordion, setOpenAccordion] = useState('location');
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

    const handleUpdate = useCallback((key, data) => {
        setAccordionData(prevData => ({
            ...prevData,
            [key]: data
        }));
    }, []);

    const handleInformationUpdate = useCallback((key, info) => {
        setAccordionInfo(prevInfo => ({
            ...prevInfo,
            [key]: info
        }));
    }, []);

    const handleSelectHospital = (hospital) => {
        console.log("Selected Hospital: ", hospital);
        
        // Assuming hospital object has the required fields
        const hospitalData = {
            name: hospital.name,
            address: {
                city: '', // You might need to extract city from hospital.vicinity or another field
                latitude: hospital.geometry.location.lat,
                longitude: hospital.geometry.location.lng,
                state: '', // You might need to derive state from another field or API
                street_address: hospital.vicinity, // Or another appropriate field
                zip_code: '' // You might need to derive zip code from another field or API
            },
            information: '' // Additional information if available
        };
    
        setAccordionData(prevData => ({
            ...prevData,
            hospital: hospitalData
        }));
    };

    
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
        if (onAccordionDataChange) {
            onAccordionDataChange(accordionData);
        }
    }, [accordionData, onAccordionDataChange]);

    console.log(accordionData);
 

    

    return(

        <div className='flex flex-col gap-2'>
            {/* Location Info Accordion */}
            <div className='flex flex-col gap-2'>
                <button onClick={() => toggleAccordion('location')} className={`${openAccordion === 'location' ? 'bg-slate-200' : ''} bg-slate-100 py-4 px-6 rounded-lg text-slate-500 flex flex-row justify-between items-center`}>
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
                        title="Location Name" 
                        onFormDataChange={(data) => handleUpdate('location', data)} 
                        onInformationChange={(info) => handleInformationUpdate('location', info)}
                        ref={ref} 
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
                        title="Parking Name"
                        onFormDataChange={(data) => handleUpdate('parking', data)} 
                        onInformationChange={(info) => handleInformationUpdate('parking', info)}
                        ref={ref} />
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
                    <Hospitals locationAddress={accordionData.location?.address} onSelectHospital={handleSelectHospital} />
                </div>
            </div>
        </div>

    );

});

export default Accordion;