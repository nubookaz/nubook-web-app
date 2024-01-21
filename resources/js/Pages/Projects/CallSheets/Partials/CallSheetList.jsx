import React from 'react';
 import { Link } from '@inertiajs/react';

export default function CallSheetList({ 
  
  project, 
  callSheets, 
  view 

}) {

  // Define a function to sort call sheets based on the desired order
  const sortCallSheets = (callSheets) => {
    // Define the desired status order
    const statusOrder = {
      "Publish": 1,
      "Unpublished": 2,
      "Draft": 3,
    };

    // Create an array to store call sheets with status order information
    const callSheetsWithOrder = callSheets.map((callSheet) => ({
      ...callSheet,
      statusOrder: statusOrder[callSheet.status],
    }));

    // Sort call sheets by status order (most recent first)
    callSheetsWithOrder.sort((a, b) => {
      // Sort by status order first
      if (a.statusOrder !== b.statusOrder) {
        return a.statusOrder - b.statusOrder;
      }
      // If status order is the same, sort by last updated time (most recent first)
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    return callSheetsWithOrder;
};


  // Get the filtered and sorted call sheets based on the selected view
  const filteredCallSheets = view === "View All" ? callSheets : callSheets.filter(callSheet => callSheet.status === view);
  const sortedCallSheets = sortCallSheets(filteredCallSheets);



  function formatDate(dateString) {
    const date = new Date(dateString);
  
    // Format the date as "Jan 20th, 2023"
    const formattedDate = date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  
    // Add the suffix for the day
    const day = date.getDate();
    let suffix = 'th';
    if (day % 10 === 1 && day !== 11) suffix = 'st';
    else if (day % 10 === 2 && day !== 12) suffix = 'nd';
    else if (day % 10 === 3 && day !== 13) suffix = 'rd';
  
    // Replace the day number with the day number + suffix
    return formattedDate.replace(/\d+/, `${day}${suffix}`);
  }
  
  function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);
  
    // Format the time as "10:00 PM"
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
  
  
 
  return (
    <div className="grid grid-cols-6 grid-rows-3 gap-10 flex-wrap h-full px-6">
      {sortedCallSheets.map(callSheet => (

        <Link key={callSheet.id} className="letter mx-3 w-full" href={route('projects.callSheets.edit.page', { id: project.id, callSheetId: callSheet.id })}>
          <div>
            <span className='font-normal text-xs bg-slate-50 px-4 py-1 flex text-center rounded mb-2 w-fit'>{callSheet.status}</span>
            <h2 className='font-normal text-xl'>{callSheet.call_sheet_name}</h2>
            <p className='font-normal text-sm'>Scheduled Date:{formatDate(callSheet.call_sheet_date_time)}</p>

            <div className='mt-8'>
              <h4>General Call Time:</h4>
              <p className='text-xl text-emerald-500 font-bold'>{formatTime(callSheet.call_sheet_date_time)}</p>
            </div>
          </div>
        </Link>

      ))}
        <div className='border-2 border-dashed border-slate-300 duration-500 bg-white hover:border-dashed hover:border-slate-400 cursor-pointer px-[4rem] text-center text-xl text-slate-300 rounded-lg h-full w-full flex justify-center items-center m-auto hover:bg-slate-300 hover:text-slate-500'>
              Click here to create a new call sheet!
        </div>
    </div>
  );
}

