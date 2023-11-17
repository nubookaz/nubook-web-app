import React from 'react';

import CardContainer from '@/Components/Containers/CardContainer';

const CallSheetDesktop = () => {
  // Sample data for demonstration
  const projectName = "Your Project Name";
  const dayInfo = "Day 1";
  const date = "September 15, 2023";
  const callTime = "7:00 AM";
  const location = "123 Main St, Glendale, AZ";
  const weather = "Sunny";
  const productionCompany = "Your Production Company";
  const companyAddress = "123 Main St, Glendale, AZ";
  const director = "Your Name";
  const assistantDirector = "Assistant Director's Name";
  const directorOfPhotography = "Cinematographer's Name";
  const locationsList = ["Location 1", "Location 2", "Location 3"];
  const scheduleList = ["8:00 AM - 10:00 AM: Scene 1", "10:30 AM - 12:30 PM: Scene 2"];
  const talentList = ["Actor 1", "Actor 2", "Actor 3"];
  const crewList = ["Crew Member 1", "Crew Member 2", "Crew Member 3"];

  return (
    <CardContainer className="call-sheet">
      <div className="call-sheet-columns flex flex-row mb-8">
        <div className="column-left w-[25%] pr-8">
          <div className="company-logo text-center flex flex-col justify-center">
            <div className='logo-img mx-auto mb-4'></div>
            <h3 className='font-semibold primary-color'>{productionCompany}</h3>
            <p>{companyAddress}</p>
          </div>
          
          {/* <h3>Director</h3>
          <p>{director}</p>
          <h3>Assistant Director</h3>
          <p>{assistantDirector}</p>
          <h3>Director of Photography</h3>
          <p>{directorOfPhotography}</p> */}
        </div>
        <div className="column-center w-[50%] text-center">
          <h3 className='text-xl primary-color font-semibold mb-4'>{projectName}</h3>
          <p className='secondary-color text-lg'>{dayInfo}</p>
          <p className='secondary-color text-xl font-semibold'>{date}</p>
          <p className='mt-16 secondary-color text-[1.5rem] font-semibold'>Your Call Time</p>
          <h2 className='primary-green-color font-bold text-[6rem] drop-shadow mb-4'>{callTime}</h2>
          <p className='pill-btn-secondary rounded-full text-xl font-semibold'>{location}</p>
        </div>
        <div className="column-right w-[25%]">
           <div className='weather-info flex flex-col justify-center pl-8 text-center'>
             <h3>Weather</h3>
             <p>{weather}</p>
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

export default CallSheetDesktop;
