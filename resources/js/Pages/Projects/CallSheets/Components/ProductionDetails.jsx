import React, { useState, useEffect } from 'react';

import CardContainer from '@/Components/Containers/CardContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {  faCalendarDays, faClapperboard, faLocationDot } from '@fortawesome/free-solid-svg-icons';


import Weather from '@/Pages/Projects/CallSheets/Components/Weather';


export default function ProductionDetails({ 

    data, 
    newData, 
    onEditProductionDetails

 }){
    


    
    function formatDateWithDay(dateString) {
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const date = data.call_sheet_date;

    const [locationData, setLocationData] = useState(null);

  
    useEffect(() => {
        // Check if newData has location properties and is not empty
        if (newData && newData.locationData) {
            setLocationData({
                street_address: newData.locationData.street_address || '',
                zip_code: newData.locationData.zip_code || '',
                city: newData.locationData.city || '',
                state: newData.locationData.state || '',
                latitude: newData.locationData.latitude || '',
                longitude: newData.locationData.longitude || '',
            });
        } else if (data.film_location && data.film_location.location) {
            // Fallback to using data if newData is not available
            setLocationData({
                street_address: data.film_location.location.street_address || '',
                zip_code: data.film_location.location.zip_code || '',
                city: data.film_location.location.city || '',
                state: data.film_location.location.state || '',
                latitude: data.film_location.location.latitude || '',
                longitude: data.film_location.location.longitude || '',
            });
        } else {
            // Set to null if neither newData nor data has location info
            setLocationData(null); 
        }
    }, [data, newData]);



    let { street_address, zip_code, city, state, latitude, longitude } = locationData || {};


 
  
    return(

        <CardContainer className="" header="Production Details" showButtonIcon={true} onClickButton={onEditProductionDetails} >
            <div className="flex flex-col gap-4">
                <div className="text-2xl primary-color flex text-center flex-row gap-4 font-semibold">
                    <FontAwesomeIcon icon={faCalendarDays} className="primary-green-color my-auto w-[2rem]" />
                    <p className='primary-color text-left font-bold text-xl'>{formatDateWithDay(date)}</p>
                </div>
                <div className='text-2xl primary-color text-center flex flex-row gap-4 font-semibold'>
                    <FontAwesomeIcon icon={faClapperboard} className="primary-green-color my-auto w-[2rem]" />
                    {!street_address && !zip_code ? (
                        <p className='secondary-color text-left text-lg'>No Location Added. Please add a location.</p>
                    ):(
                        <p className='primary-color text-left leading-tight text-lg'>{street_address}<br/>{city}, {state} {zip_code}</p>
                    )}
                </div>
                <div className='bg-slate-50 p-2 rounded-2xl secondary-color h-full min-h-[9rem] w-full'>
                    <Weather locationData={locationData} data={data} date={date} />
                </div>
            </div>
        </CardContainer>

    );

}

