import React, { useState, useEffect } from 'react';

import CardContainer from '@/Components/Containers/CardContainer';
 import GoogleMap from './GoogleMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faMapLocationDot } from '@fortawesome/free-solid-svg-icons';




export default function Locations({

    data,
    newData,
    onEditLocation,

}){

    const [locationData, setLocationData] = useState(null);

    useEffect(() => {
        // Initialize locationData based on data if available
        if (data.film_location && data.film_location.location) {
            setLocationData({
                street_address: data.film_location.location.street_address || '',
                zip_code: data.film_location.location.zip_code || '',
            });
        } else {
            setLocationData(null); // Set locationData to null if data is not available
        }
    }, [data]);

    const LocationMenu = () => [
        { 
            label: 'Add Parking and Hospital Details', 
            onClick: () => onEditLocation(),
        },
    ];


    return(

        <CardContainer
            className="h-full flex flex-col gap-4"
            header="Location Details"
            showButtonIcon={data.film_location && data.film_location.location}
            menuItems={LocationMenu()}
        >
            {locationData !== null ? (
                // Render this content when locationData is available
                <div className="justify-start rounded-xl h-full overflow-hidden grow">
                    <GoogleMap newData={newData} locationData={locationData} />
                </div>
            ) : (
                // Render this content when locationData is null
                <div className="justify-start justify-center rounded-xl h-full overflow-hidden grow flex flex-col gap-4 text-center bg-slate-50 text-slate-400">
                    <FontAwesomeIcon className='text-3xl' icon={faMapLocationDot}></FontAwesomeIcon>
                    Location data is not available. Please add a location to view the map.
                </div>
            )}

            <div className="grow flex flex-col gap-4">
                <div className="bg-slate-50 rounded-xl py-6 px-8 text-center text-slate-400">
                    You have not added a parking address.
                </div>
                <div className="bg-slate-50 rounded-xl py-6 px-8 text-center text-slate-400">
                    You have not added a hospital address.
                </div>
            </div>
        </CardContainer>

    );


}
