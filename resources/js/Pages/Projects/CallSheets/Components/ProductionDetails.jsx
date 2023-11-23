 import React from 'react';

import CardContainer from '@/Components/Containers/CardContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {  faCalendarDays, faLocationDot } from '@fortawesome/free-solid-svg-icons';


import Weather from '@/Pages/Projects/CallSheets/Components/Weather';


export default function ProductionDetails({ data, newData, onEditProductionDetails }){
    
    function formatDateWithDay(dateString) {
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const newLocationData = newData ? newData : data;

    const date = newLocationData.call_sheet_date;
    const street_address = newLocationData.film_location?.location?.street_address || '';
    const city = newLocationData.film_location?.location?.city || '';
    const state = newLocationData.film_location?.location?.state || '';
    const zip_code = newLocationData.film_location?.location?.zip_code || '';
    const country = newLocationData.film_location?.location?.country || '';
 
    const productionMenu = () => [
        { 
            label: 'Edit Production Details', 
            onClick: () => onEditProductionDetails(),
        },
    ];
 
    return(

        <CardContainer className="" header="Production Details" showButtonIcon={true} menuItems={productionMenu()} >
            <div className="flex flex-col gap-4">
                <div className="text-2xl primary-color flex text-center flex-row gap-4 font-semibold">
                    <FontAwesomeIcon icon={faCalendarDays} className="primary-green-color my-auto w-[2rem]" />
                    <p className='primary-color text-left text-2xl'>{formatDateWithDay(data.call_sheet_date)}</p>
                </div>
                <div className='text-2xl primary-color text-center flex flex-row gap-4 font-semibold'>
                    <FontAwesomeIcon icon={faLocationDot} className="primary-green-color my-auto w-[2rem]" />
                    {!street_address && !zip_code ? (
                        <p className='secondary-color text-left text-lg'>No Location Added. Please add a location.</p>
                    ):(
                        <p className='primary-color text-left text-xl'>{street_address}<br/>{city}, {state} {zip_code}</p>
                    )}
                </div>
                <div className='bg-slate-50 p-2 rounded-2xl secondary-color h-full min-h-[9rem] w-full'>
                    <Weather data={data} newData={newData} street_address={street_address} zip_code={zip_code} date={date} country={country} />
                </div>
            </div>
        </CardContainer>

    );

}

