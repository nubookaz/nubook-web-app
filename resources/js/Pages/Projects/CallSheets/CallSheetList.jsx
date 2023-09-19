import React from 'react';
import ActiveCard from '@/Components/ActiveCard';

function CallSheetList({ project, callSheets }) {
  return (
    <div className="flex flex-row gap-4">
      {callSheets.map(callSheet => (
        <ActiveCard
          status="Call Sheet"
          cardType="callSheet"
          href={
            route('projects.callSheets.edit', { id: project.id, callSheetId: callSheet.id }) // Default URL for other project stages
          }
          key={callSheet.id}
          cardTitle={callSheet.callSheetTitle} // Adjust property name as needed
          shootDate={callSheet.callSheetDate} 
          progressBar={true}// Adjust property name as needed
        />
      ))}
    </div>
  );
}

export default CallSheetList;
