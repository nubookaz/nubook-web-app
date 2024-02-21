import React, { useEffect, useState } from 'react';

import CardContainer from '@/Components/Containers/CardContainer';
import Weather from '@/Pages/Projects/CallSheets/Components/Weather';
import GoogleMap from '../Components/GoogleMap';





export default function CallSheetDesktopPreview({
  
  project,
  callSheet

}) {

  console.log(project);
  const [locationData, setLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [callTime, setCallTime] = useState(null);
  const [date, setDate] = useState(null);

  function formatTime(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedHours = hours.toString();
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  function formatDateWithDay(dateString) {
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    let timeValue = '';
    let locationInfo = null;
    let dateValue = '';
    if (callSheet && callSheet.film_location && callSheet.film_location.location) {
      locationInfo = {
        street_address: callSheet.film_location.location.street_address || '',
        city: callSheet.film_location.location.city || '',
        state: callSheet.film_location.location.state || '',
        zip_code: callSheet.film_location.location.zip_code || '',
        latitude: callSheet.film_location.location.latitude || '',
        longitude: callSheet.film_location.location.longitude || '',
      };
    } else {
      // Set to null if callSheet does not have film location info
      locationInfo = null;
    }

    // Set the location data
    setLocationData(locationInfo);
  
    if (callSheet && callSheet.call_sheet_date_time) {
      timeValue = formatTime(callSheet.call_sheet_date_time);
      dateValue = formatDateWithDay(callSheet.call_sheet_date_time.split('T')[0]);
    }
  
    // Set the formatted time and date
    setCallTime(timeValue);
    setDate(dateValue);
  }, [callSheet]); // Dependency array updated to include callSheet
  
  const locationString = locationData ? `${locationData.street_address} ${locationData.city} ${locationData.state}, ${locationData.zip_code}` : '';
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationString)}`;
  
  function isLocationDataEmpty(locationData) {
    return !locationData || Object.values(locationData).every(value => value === '');
  }

  const scheduleList = ["8:00 AM - 10:00 AM: Scene 1", "10:30 AM - 12:30 PM: Scene 2"];
  const talentList = ["Actor 1", "Actor 2", "Actor 3"];
  const crewList = ["Crew Member 1", "Crew Member 2", "Crew Member 3"];

  return (
    <CardContainer className="bg-white h-full !shadow-sm">
      <div className="call-sheet-columns flex flex-row gap-4">
        <div className="column-left w-[25%]">
          <div className="company-logo text-center flex flex-col justify-center">
            <div className='logo-img bg-slate-100 mx-auto mb-4'></div>
            <h3 className='font-semibold primary-color'>Company_name</h3>
           </div>
        </div>
        <div className="flex flex-col w-[50%] gap-4">
          <div className='flex flex-col text-center'>
            <h3 className='text-xl primary-color font-bold'>{project.project_name}</h3>
            <p className='secondary-color text-xl font-semibold'>{date}</p>
            <div className='flex flex-col gap-2 mt-[2rem]'>
              <p className='secondary-color text-[1.2rem] font-semibold'>Your Call Time</p>
              <span className='primary-green-color font-bold text-[5rem] leading-none'>{callTime}</span>
              {!isLocationDataEmpty(locationData) ? (
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className='rounded-full text-slate-500 text-md font-semibold bg-slate-50 py-2'>
                  {locationString}
                </a>    
              ) : (
                <div className='rounded-full text-slate-500 text-md font-semibold bg-slate-50 py-2'> Location not available </div>
                
              )}
            </div>
          </div>
          {callSheet.bulletin ? (
            <div className='bg-slate-50 w-full rounded-md text-sm text-slate-500 p-4'>
              {callSheet.bulletin}
            </div>
          ):null}
        </div>
        <div className="w-[25%]">
           <div className='py-6 px-4flex flex-col justify-center pl-8 text-center'>
             <Weather locationData={locationData} data={callSheet} layoutStyle='portrait'/>
           </div>
        </div>
      </div>



      <div className="locations">
        {/* <GoogleMap locationData={locationData} style={{ width: '100%', height: '100%' }} /> */}
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

 