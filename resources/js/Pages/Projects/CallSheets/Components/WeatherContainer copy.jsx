import React, { useState, useEffect } from 'react';

import CardContainer from '@/Components/Containers/CardContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {  faCalendarDays, faClapperboard } from '@fortawesome/free-solid-svg-icons';


import Weather from '@/Pages/Projects/CallSheets/Components/Weather';


export default function WeatherContainer({ 

    data, 
    newData, 
    className,

 }){
    

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

 
  
    return(

        <CardContainer className={`${className}`} header="Weather Details" >
            <div className='bg-orange-50 p-4 rounded-2xl secondary-color h-full min-h-[9rem] w-full'>
                <Weather locationData={locationData} data={data} date={date} />
            </div>
        </CardContainer>

    );

}

