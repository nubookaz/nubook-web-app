import React, { useState, useEffect } from 'react';

 

export default function Move({

    data,
    scheduleBreakData,

}) {

  const formattedShootLocation = data && data.film_location && data.film_location.location
  ? `${data.film_location.location.street_address}\n${data.film_location.location.city}, ${data.film_location.location.state} ${data.film_location.location.zip_code}`
  : "N/A. Add a location in the Call Sheets page";
  
  const [moveData, setMoveData] = useState({
    shootLocation: formattedShootLocation, 
  });

  return (
      <div className="flex flex-row w-full justify-between">
          <div className='flex font-bold text-white items-center ml-3 my-auto h-full max-w-[16rem] border-0 justify-start text-sm justify-between'>Company Move</div>

          <div className='flex flex-col justify-center text-xs'>{moveData.shootLocation}</div>

          <div className='flex content-center w-full max-w-[45%] py-1'>
            <input
              maxLength={128}
              placeholder="Notes...."
              className='grow text-slate-500 text-xs border-0 bg-transparent placeholder:text-white'
            />
          </div>
      </div>
  );
}
 