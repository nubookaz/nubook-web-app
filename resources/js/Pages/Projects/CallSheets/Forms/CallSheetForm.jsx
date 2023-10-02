// CallSheetForm.jsx

import React from 'react';
import CallSheetDetails from '@/Pages/Projects/CallSheets/Forms/CallSheetDetails';

const CallSheetForm = ({
  callSheetData,
  setCallSheetTitle,
  setCallSheetDate,
  checkFormStatus,
}) => {
  return (
    <div>
      <CallSheetDetails
        callSheetData={callSheetData}
        setCallSheetTitle={setCallSheetTitle}
        setCallSheetDate={setCallSheetDate}
        checkFormStatus={checkFormStatus}
      />
    </div>
  );
};

export default CallSheetForm;
