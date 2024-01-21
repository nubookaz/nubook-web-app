import React, { useState, useEffect } from 'react';
import { useModal } from '@/Components/Contexts/ModalContext';

import CardContainer from '@/Components/Containers/CardContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {  faCalendarDays, faClapperboard } from '@fortawesome/free-solid-svg-icons';

export default function ProductionDetails({ 
    callSheet, 
    onClick
 }){
    const { toggleDrawer } = useModal();
    const handleProductionDetailsClick = () => {
        toggleDrawer('productionDetails');  
    };
    
    function formatDateWithDay(dateString) {
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const [locationData, setLocationData] = useState(null);
    const [date, setDate] = useState(null);

    useEffect(() => {
        let locationInfo = null;
        let dateValue = '';
      
        if (callSheet && callSheet.call_sheet_date_time) {
          locationInfo = callSheet.film_location ? {
            street_address: callSheet.film_location.location?.street_address || '',
            zip_code: callSheet.film_location.location?.zip_code || '',
            city: callSheet.film_location.location?.city || '',
            state: callSheet.film_location.location?.state || '',
            latitude: callSheet.film_location.location?.latitude || '',
            longitude: callSheet.film_location.location?.longitude || '',
          } : null;
          dateValue = callSheet.call_sheet_date_time.split('T')[0]; // Get the date part only
        }
      
        setLocationData(locationInfo);
        setDate(dateValue); // Directly set the date string
      }, [callSheet]);
      
    let { street_address, zip_code, city, state, latitude, longitude } = locationData || {};

    return(
        <CardContainer className="shrink" header="Production Details" onClick={handleProductionDetailsClick} >
            <div className="flex flex-col gap-4">
                {date && (
                    <div className="text-2xl primary-color flex text-center flex-row gap-4 font-semibold">
                        <FontAwesomeIcon icon={faCalendarDays} className="primary-green-color my-auto w-[2rem]" />
                        <p className='text-slate-500 text-left font-bold text-xl'>{formatDateWithDay(date)}</p>
                    </div>
                )}

                <div className='text-2xl primary-color text-center flex flex-row gap-4 font-semibold'>
                    <FontAwesomeIcon icon={faClapperboard} className="primary-green-color my-auto w-[2rem]" />
                    {!street_address && !zip_code ? (
                        <p className='text-slate-400 text-left text-lg'>No Location Added. Please add a location.</p>
                    ):(
                        <p className='text-slate-400 text-left leading-tight text-lg'>{street_address}<br/>{city}, {state} {zip_code}</p>
                    )}
                </div>
            </div>
        </CardContainer>
    );
}
