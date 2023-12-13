import React, { useEffect, useState } from 'react';

import CardContainer from '@/Components/Containers/CardContainer';
import Weather from '@/Pages/Projects/CallSheets/Components/Weather';





export default function CallSheetDesktopPreview({data}) {



  const [locationData, setLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);


  useEffect(() => {
    // Check if data has parking_location and it's not empty
    if (data && data.film_location && data.film_location.location) {
      setLocationData({
        street_address: data.film_location.location.street_address || '',
        city: data.film_location.location.city || '',
        state: data.film_location.location.state || '',
        zip_code: data.film_location.location.zip_code || '',
        latitude: data.film_location.location.latitude || '',
        longitude: data.film_location.location.longitude || '',
      });
    } else {
      // Set to null if data does not have parking location info
      setLocationData(null);
    }
  }, [data]);
 
  const date = new Date(data.call_sheet_date);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const formattedDateWithName = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  const locationString = `${locationData?.street_address} ${locationData?.city} ${locationData?.state}, ${locationData?.zip_code}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationString)}`;
  



  console.log(data);




 
  const callTime = "7:00 AM";
  const productionCompany = "Your Production Company";
  const companyAddress = "123 Main St, Glendale, AZ";
 
  const locationsList = ["Location 1", "Location 2", "Location 3"];
  const scheduleList = ["8:00 AM - 10:00 AM: Scene 1", "10:30 AM - 12:30 PM: Scene 2"];
  const talentList = ["Actor 1", "Actor 2", "Actor 3"];
  const crewList = ["Crew Member 1", "Crew Member 2", "Crew Member 3"];

  return (
    <CardContainer className="call-sheet">
      <div className="call-sheet-columns flex flex-row gap-4">
        <div className="column-left w-[25%]">
          <div className="company-logo text-center flex flex-col justify-center">
            <div className='logo-img bg-slate-100 mx-auto mb-4'></div>
            <h3 className='font-semibold primary-color'>{data.project.user.primary_production_company.company_name}</h3>
           </div>
        </div>
        <div className="flex flex-col w-[50%] gap-4">
          <div className='flex flex-col text-center'>
            <h3 className='text-xl primary-color font-bold'>{data.project.project_name}</h3>
            <p className='secondary-color text-xl font-semibold'>{formattedDateWithName}</p>
            <div className='flex flex-col gap-2 mt-[2rem]'>
              <p className='secondary-color text-[1.2rem] font-semibold'>Your Call Time</p>
              <span className='primary-green-color font-bold text-[5rem] leading-none'>{callTime}</span>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className='rounded-full text-slate-500 text-md font-semibold bg-slate-50 py-2'>
                {locationString}
              </a>         
            </div>
          </div>
          <div className='bg-slate-50 w-full py-8'>
            {data.bulletin}
          </div>
        </div>
        <div className="w-[25%]">
           <div className='py-6 px-4flex flex-col justify-center pl-8 text-center'>
             <Weather locationData={locationData} data={data} layoutStyle='portrait'/>
           </div>
        </div>
      </div>

      <div className="locations">
        <h3>Locations</h3>
        <ul>
          {locationsList.map((location, index) => (
            <li key={index}>{location}</li>
          ))}
        </ul>
      </div>
      <div className="schedule">
        <h3>Schedule</h3>
        <ul>
          {scheduleList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="talent">
        <h3>Talent</h3>
        <ul>
          {talentList.map((talent, index) => (
            <li key={index}>{talent}</li>
          ))}
        </ul>
      </div>
      <div className="clients">
        <h3>Clients</h3>
        <ul>

        </ul>
      </div>
      <div className="crew">
        <h3>Crew</h3>
        <ul>
          {crewList.map((crew, index) => (
            <li key={index}>{crew}</li>
          ))}
        </ul>
      </div>
    </CardContainer>
  );
};

 