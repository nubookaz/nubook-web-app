import React, { useState, useEffect } from 'react';

import CardContainer from '@/Components/Containers/CardContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {  faCalendarDays, faClapperboard } from '@fortawesome/free-solid-svg-icons';



export default function ProductionDetails({ 

    data, 
    newData, 
    onEditProductionDetails

 }){
    
  
    
    function formatDateWithDay(dateString) {
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }


    const [locationData, setLocationData] = useState(null);
    const [date, setDate] = useState(null);

    useEffect(() => {
        let locationInfo = null;
        let dateValue = '';
      
        // Check if 'newData' has 'call_sheet_date_time', regardless of 'film_location'
        if (newData && newData.call_sheet_date_time) {
          locationInfo = newData.film_location ? {
            street_address: newData.film_location.location?.street_address || '',
            zip_code: newData.film_location.location?.zip_code || '',
            city: newData.film_location.location?.city || '',
            state: newData.film_location.location?.state || '',
            latitude: newData.film_location.location?.latitude || '',
            longitude: newData.film_location.location?.longitude || '',
          } : null;
          dateValue = newData.call_sheet_date_time.split('T')[0]; // Get the date part only
        } else if (data && data.call_sheet_date_time) {
          // Check if 'data' has 'call_sheet_date_time', regardless of 'film_location'
          locationInfo = data.film_location ? {
            street_address: data.film_location.location?.street_address || '',
            zip_code: data.film_location.location?.zip_code || '',
            city: data.film_location.location?.city || '',
            state: data.film_location.location?.state || '',
            latitude: data.film_location.location?.latitude || '',
            longitude: data.film_location.location?.longitude || '',
          } : null;
          dateValue = data.call_sheet_date_time.split('T')[0]; // Get the date part only
        }
      
        setLocationData(locationInfo);
        setDate(dateValue); // Directly set the date string
      }, [data, newData]);
      
 
      
    let { street_address, zip_code, city, state, latitude, longitude } = locationData || {};

    
  
    return(

        <CardContainer className="" header="Production Details" showButtonIcon={true} onClickButton={onEditProductionDetails} >
            <div className="flex flex-col gap-4">
                {date && (
                    <div className="text-2xl primary-color flex text-center flex-row gap-4 font-semibold">
                        <FontAwesomeIcon icon={faCalendarDays} className="primary-green-color my-auto w-[2rem]" />
                        <p className='primary-color text-left font-bold text-xl'>{formatDateWithDay(date)}</p>
                    </div>
                )}

                <div className='text-2xl primary-color text-center flex flex-row gap-4 font-semibold'>
                    <FontAwesomeIcon icon={faClapperboard} className="primary-green-color my-auto w-[2rem]" />
                    {!street_address && !zip_code ? (
                        <p className='secondary-color text-left text-lg'>No Location Added. Please add a location.</p>
                    ):(
                        <p className='primary-color text-left leading-tight text-lg'>{street_address}<br/>{city}, {state} {zip_code}</p>
                    )}
                </div>
            </div>
        </CardContainer>

    );

}

