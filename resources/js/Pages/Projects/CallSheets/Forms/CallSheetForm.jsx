// CallSheetForm.jsx

import React from 'react';
import CallSheetDetailsForm from '@/Pages/Projects/CallSheets/Forms/CallSheetDetailsForm';

const CallSheetForm = ({
  callSheetData,
  setCallSheetTitle,
  setCallSheetDate,
  checkFormStatus,
}) => {
  return (
    <div>
      <CallSheetDetailsForm
        callSheetData={callSheetData}
        setCallSheetTitle={setCallSheetTitle}
        setCallSheetDate={setCallSheetDate}
        checkFormStatus={checkFormStatus}
      />
    </div>
  );
};

export default CallSheetForm;
