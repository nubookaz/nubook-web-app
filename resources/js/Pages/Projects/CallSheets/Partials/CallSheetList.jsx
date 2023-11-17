import React from 'react';
import ActiveCard from '@/Components/Containers/ActiveCard';

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

  return (
    <div className="grid grid-cols-4 gap-4 flex-wrap">
      {sortedCallSheets.map(callSheet => (
        <ActiveCard
          status={callSheet.status}
          cardType="callSheet"
          href={route('projects.callSheets.edit', { id: project.id, callSheetId: callSheet.id })}
          key={callSheet.id}
          cardTitle={callSheet.call_sheet_name}
          shootDate={callSheet.call_sheet_date}
          progressBar={true}
        />
      ))}
    </div>
  );
}

