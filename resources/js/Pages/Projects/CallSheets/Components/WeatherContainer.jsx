import React, { useState, useEffect } from 'react';
import CardContainer from '@/Components/Containers/CardContainer';
import Weather from '@/Pages/Projects/CallSheets/Components/Weather';

export default function WeatherContainer({ project, callSheet, className }) {
    const [locationData, setLocationData] = useState(null);

    useEffect(() => {
        if (callSheet && callSheet.film_locations && callSheet.film_locations.length > 0) {
            const filmLocation = callSheet.film_locations[0].location;
            if (filmLocation) {
                setLocationData({
                    street_address: filmLocation.street_address || '',
                    zip_code: filmLocation.zip_code || '',
                    city: filmLocation.city || '',
                    state: filmLocation.state || '',
                    latitude: filmLocation.latitude || '',
                    longitude: filmLocation.longitude || '',
                });
            }
        } else {
            setLocationData(null);
        }
    }, [callSheet]);

    const date = callSheet ? callSheet.call_sheet_date : null;

 

    return (
        <CardContainer className={className} header="Weather Details">
            <div className='bg-orange-50 p-4 rounded-2xl secondary-color h-full min-h-[9rem] w-full'>
                <Weather locationData={locationData} callSheet={callSheet} date={date} />
            </div>
        </CardContainer>
    );
}
