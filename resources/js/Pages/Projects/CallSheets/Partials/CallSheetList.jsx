import React from 'react';
 import { Link } from '@inertiajs/react';

export default function CallSheetList({ project, callSheets, view }) {
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
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const event = new Date(dateString);
    
    let formattedDate = event.toLocaleDateString('en-US', options);
  
    // Add the suffix for the day
    const day = event.getDate();
    let suffix = 'th';
  
    if (day % 10 === 1 && day !== 11) suffix = 'st';
    else if (day % 10 === 2 && day !== 12) suffix = 'nd';
    else if (day % 10 === 3 && day !== 13) suffix = 'rd';
  
    // Replace the day number with the day number + suffix
    formattedDate = formattedDate.replace(/\d+/, `${day}${suffix}`);
  
    return formattedDate;
  }
  
  

  return (
    <div className="grid grid-cols-4 gap-4 flex-wrap">
      {sortedCallSheets.map(callSheet => (
        // <ActiveCard
        //   data={callSheets}
        //   status={callSheet.status}
        //   cardType="callSheet"
        //   href={route('projects.callSheets.edit.page', { id: project.id, callSheetId: callSheet.id })}
        //   key={callSheet.id}
        //   cardTitle={callSheet.call_sheet_name}
        //   shootDate={callSheet.call_sheet_date}
        //   progressBar={true}
        // />


        <Link key={callSheet.id} className="letter" href={route('projects.callSheets.edit.page', { id: project.id, callSheetId: callSheet.id })}>
          <div>
            <span className='font-normal text-xs bg-slate-50 px-4 py-1 flex text-center rounded mb-2 w-fit'>{callSheet.status}</span>
            <h2 className='font-normal text-xl'>{callSheet.call_sheet_name}</h2>
            <p className='font-normal text-sm'>{formatDate(callSheet.call_sheet_date)}</p>

          </div>
        </Link>

      ))}
    </div>
  );
}

